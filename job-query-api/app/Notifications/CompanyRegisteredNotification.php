<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class CompanyRegisteredNotification extends Notification
{
    use Queueable;

    protected $company;

    /**
     * Create a new notification instance.
     */
    public function __construct($company)
    {
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
            ->subject('Your Company Profile Has Been Successfully Created')
            ->greeting('Dear ' . $this->company->name . ' Team,')
            ->line('We\'re excited to inform you that your company profile on Job Query has been successfully created! You\'re now all set to manage your company\'s presence and start posting job listings to attract top talent.')
            ->line('Your Company Profile Details:')
            ->line('Company Name: ' . $this->company->name)
            ->line('Company Website: ' . ($this->company->website ?: 'Not Provided'))
            ->line('Primary Contact Email: ' . $this->company->email)
            ->line('Company Description: ' . ($this->company->description ?: 'Not Provided'))
            ->line('Soon you will receive an email with details about your recruiter\'s login information where they can start posting job openings and manage applications easily from the Job Query\'s dashboard.')
            ->line('If you need any assistance or have questions, feel free to reach out to our support team at jobQuery@contact.com.')
            ->line('Thank you for choosing Job Query. We look forward to helping you find the right candidates for your company!')
            ->salutation('Best regards,')
            ->salutation('The Job Query Team');
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
