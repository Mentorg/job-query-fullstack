<?php

namespace App\Http\Requests\Api\V1;

use Illuminate\Foundation\Http\FormRequest;

class UpdateJobRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|max:255',
            'isFulltime' => 'required|boolean',
            'workPreference' => 'required|string',
            'seniority' => 'required|string',
            'experience' => 'required|integer',
            'salaryFrom' => 'required|integer',
            'salaryTo' => 'required|integer',
            'isSalaryMonthly' => 'required|boolean',
            'hasVisaSponsorship' => 'required|boolean',
            'education' => 'required|string',
            'positionOverview' => 'required|string',
            'locations' => 'required|array',
            'locations.*' => 'required|integer|exists:locations,id',
            'qualifications' => 'required|array',
            'qualifications.*.id' => 'nullable|integer|exists:qualifications,id',
            'qualifications.*.description' => 'required|string',
            'responsibilities' => 'required|array',
            'responsibilities.*.id' => 'nullable|integer|exists:responsibilities,id',
            'responsibilities.*.description' => 'required|string',
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'is_fulltime' => $this->isFulltime ?? false,
            'work_preference' => $this->workPreference ?? 'default',
            'salary_from' => $this->salaryFrom ?? 0,
            'salary_to' => $this->salaryTo ?? 0,
            'is_salary_monthly' => $this->isSalaryMonthly ?? true,
            'has_visa_sponsorship' => $this->hasVisaSponsorship ?? false,
            'position_overview' => $this->positionOverview ?? ''
        ]);
    }
}
