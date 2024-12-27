<?php

namespace App\Services\Api\V1;

use App\Http\Resources\V1\JobCollection;
use App\Http\Resources\V1\JobResource;
use App\Interfaces\JobServiceInterface;
use App\Models\Job;
use App\Models\Qualification;
use App\Models\Responsibility;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\DB;

class JobService implements JobServiceInterface
{
  protected function handleJobAttributes(array $validated)
  {
    return [
      'title' => $validated['title'],
      'is_fulltime' => $validated['isFulltime'],
      'work_preference' => $validated['workPreference'],
      'seniority' => $validated['seniority'],
      'experience' => $validated['experience'],
      'salary_from' => $validated['salaryFrom'],
      'salary_to' => $validated['salaryTo'],
      'is_salary_monthly' => $validated['isSalaryMonthly'],
      'has_visa_sponsorship' => $validated['hasVisaSponsorship'],
      'education' => $validated['education'],
      'position_overview' => $validated['positionOverview'],
    ];
  }

  public function getJobs()
  {
    return new JobCollection(Job::with(['company', 'locations', 'qualifications', 'responsibilities'])
      ->orderBy('created_at', 'asc')
      ->get());
  }

  public function create(array $validated, $request)
  {
    $recruiter = $request->user()->recruiter;
    $validated['recruiter_id'] = $recruiter->id;
    $validated['company_id'] = (int)$recruiter->company_id;

    DB::beginTransaction();

    try {
      $job = $recruiter->jobs()->create(array_merge($this->handleJobAttributes($validated), [
        'deadline' => Carbon::now()->addMonth(),
        'company_id' => $validated['company_id'],
        'applicants' => 0,
        'status' => 'open'
      ]));

      $this->attachJobAttributes($job, $validated);

      DB::commit();
      return new JobResource($job);
    } catch (Exception $e) {
      DB::rollBack();
      throw new Exception("An error occurred while creating the job: " . $e->getMessage());
    }
  }

  protected function attachJobAttributes($job, array $fields)
  {
    $job->locations()->attach($fields['locations']);

    $qualifications = array_map(function ($description) use ($job) {
      return ['description' => $description, 'job_listings_id' => $job->id];
    }, $fields['qualifications']);
    Qualification::insert($qualifications);

    $responsibilities = array_map(function ($description) use ($job) {
      return ['description' => $description, 'job_listings_id' => $job->id];
    }, $fields['responsibilities']);
    Responsibility::insert($responsibilities);
  }

  public function getById($job)
  {
    $jobRecord = $job->with(['company', 'locations', 'qualifications', 'responsibilities'])->find($job->id);

    if (!$jobRecord) {
      return null;
    }

    return new JobResource($jobRecord);
  }

  public function update($job, array $validated)
  {
    DB::beginTransaction();

    try {
      $job->update($this->handleJobAttributes($validated));

      $this->updateJobAttributes($job, $validated['qualifications'], Qualification::class);
      $this->updateJobAttributes($job, $validated['responsibilities'], Responsibility::class);

      if (isset($validated['locations'])) {
        $job->locations()->sync($validated['locations']);
      }

      DB::commit();
      return new JobResource($job);
    } catch (Exception $e) {
      DB::rollBack();
      throw new Exception("An error occurred while updating the job: " . $e->getMessage());
    }
  }

  protected function updateJobAttributes($job, array $attributes, $model)
  {
    $existingAttributes = $model::where('job_listings_id', $job->id)->get()->keyBy('id');

    foreach ($attributes as $attribute) {
      if (isset($attribute['id']) && $existingAttributes->has($attribute['id'])) {
        $existingAttributes->get($attribute['id'])->update(['description' => $attribute['description']]);
        $existingAttributes->forget($attribute['id']);
      } else {
        $model::create([
          'job_listings_id' => $job->id,
          'description' => $attribute['description']
        ]);
      }
    }

    $model::where('job_listings_id', $job->id)
      ->where('id', $existingAttributes->keys())
      ->delete();
  }

  public function delete($job)
  {
    $job->delete();
    return $job;
  }

  public function getJobsByRecruiter($user)
  {
    $recruiter = $user->recruiter;
    $recruiterJobs = Job::with(['company', 'locations', 'qualifications', 'responsibilities'])
      ->where('recruiter_id', $recruiter->id)
      ->orderBy('created_at', 'desc')
      ->get();

    return new JobCollection($recruiterJobs);
  }

  public function updateStatus($job, array $fields)
  {
    if ($job->status === 'filled' && $fields['status'] === 'open') {
      throw new Exception('Cannot reopen a filled job.');
    }

    $job->update(['status' => $fields['status']]);

    return new JobResource($job);
  }
}
