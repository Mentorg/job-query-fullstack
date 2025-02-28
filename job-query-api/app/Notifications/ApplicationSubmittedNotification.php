<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ApplicationSubmittedNotification extends Notification
{
    use Queueable;

    protected $job;
    protected $company;

    /**
     * Create a new notification instance.
     */
    public function __construct($job, $company)
    {
        $this->job = $job;
        $this->company = $company;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Job Application Submitted')
            ->greeting('Hello ' . $notifiable->name . ',')
            ->line('Thank you for applying to the job position "' . $this->job->title . '" at ' . $this->company->name . '.')
            ->line('Your application has been successfully received, and we will review it shortly.')
            ->line('If you have any questions, feel free to reach out.')
            ->action('View Job Posting', 'http://localhost:5173/jobs/' . $this->job->id)
            ->line('Thank you for your interest in this position!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
