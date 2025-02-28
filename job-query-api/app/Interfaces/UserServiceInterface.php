<?php

namespace App\Interfaces;

interface UserServiceInterface
{
    public function getUsers();

    public function getById($request);

    public function update($user, array $validated);

    public function delete($user);

    public function updateEmail(array $validated, $request);

    public function updatePassword($validated, $user);

    public function updateLocaleSetting(array $fields, $request);

    public function getNotifications($request);
}
