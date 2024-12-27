<?php

namespace App\Policies;

use App\Models\Job;
use App\Models\User;

class JobPolicy
{
    public function viewAny(User $user)
    {
        return $user->hasAnyRole(['admin', 'recruiter', 'applicant']);
    }

    public function create(User $user)
    {
        return $user->hasPermissionTo('create: job') || $user->hasRole('recruiter');
    }

    public function update(User $user, Job $job)
    {
        if ($user->hasRole('admin')) {
            return true;
        }

        if ($user->hasRole('recruiter') && $user->recruiter->id === $job->recruiter_id) {
            return true;
        }

        return false;
    }

    public function delete(User $user, Job $job)
    {
        if ($user->hasRole('admin')) {
            return true;
        }

        if ($user->hasRole('recruiter') && $user->recruiter->id === $job->recruiter_id) {
            return true;
        }

        return false;
    }
}
