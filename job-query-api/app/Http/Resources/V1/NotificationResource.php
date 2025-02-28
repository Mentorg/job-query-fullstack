<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NotificationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $notificationTypes = [
            'App\\Notifications\\UpdateApplicationStatus' => 'Application status update',
        ];
        return [
            'id' => (string) $this->id,
            'type' => $notificationTypes[$this->type] ?? $this->type,
            'message' => $this->data['message'],
            'status' => $this->data['status'],
            'createdAt' => $this->created_at->toIso8601String(),
            'updatedAt' => $this->updated_at->toIso8601String(),
            'readAt' => $this->read_at ? $this->read_at->toIso8601String() : null,
            'notifiable' => [
                'id' => $this->notifiable_id,
            ],
        ];
    }
}
