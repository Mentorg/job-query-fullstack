<?php

namespace App\Policies;

use App\Models\Company;
use App\Models\User;

class CompanyPolicy
{
    public function viewAny(User $user)
    {
        return $user->hasAnyRole(['admin', 'recruiter', 'applicant']);
    }

    public function create(User $user)
    {
        return $user->hasPermissionTo('create: company') || $user->hasRole('admin');
    }

    public function update(User $user, Company $company)
    {
        if ($user->hasRole('admin')) {
            return true;
        }

        if ($user->hasRole('recruiter') && $user->recruiter->company_id === $company->id) {
            return true;
        }

        return false;
    }

    public function delete(User $user, Company $company)
    {
        if ($user->hasRole('admin')) {
            return true;
        }

        if ($user->hasRole('recruiter') && $user->recruiter->company_id === $company->id) {
            return true;
        }

        return false;
    }
}
