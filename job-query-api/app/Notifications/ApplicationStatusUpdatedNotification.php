<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ApplicationStatusUpdatedNotification extends Notification
{
    use Queueable;

    protected $application;
    protected $job;
    protected $recruiter;
    protected $company;

    /**
     * Create a new notification instance.
     */
    public function __construct($application, $job, $recruiter, $company)
    {
        $this->application = $application;
        $this->job = $job;
        $this->recruiter = $recruiter;
        $this->company = $company;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        switch ($this->application->status) {
            case 'interview':
                return (new MailMessage)
                    ->subject('Your application for ' . $this->job->title . ' has been shortlisted for an interview')
                    ->greeting('Dear ' . $notifiable->name . ',')
                    ->line('We are pleased to inform you that your application for the position of ' . $this->job->title . ' at ' . $this->company->name . ' has been shortlisted for an interview!')
                    ->line('Our team was impressed with your qualifications, and we would like to invite you for an interview. In the next few days you will receive the details for the interview.')
                    ->line('Please confirm your availability by replying to this email. We look forward to discussing your application in more detail.')
                    ->line('Best regards,')
                    ->line($this->company->name)
                    ->line($this->recruiter->name)
                    ->line($this->recruiter->email);
            case 'shortlisted':
                return (new MailMessage)
                    ->subject('Congratulations! You\'ve been shortlisted for the ' . $this->job->title . ' position')
                    ->greeting('Dear ' . $notifiable->name . ',')
                    ->line('We are excited to inform you that your application for the ' . $this->job->title . ' position at ' . $this->company->name . ' has been shortlisted!')
                    ->line('Your qualifications and experience align with what we are looking for. Our hiring team will be in touch soon to discuss the next steps. We appreciate your interest in joining ' . $this->company->name . ' and will reach out shortly to keep you informed.')
                    ->line('Thank you for your patience,')
                    ->line($this->company->name)
                    ->line($this->recruiter->name)
                    ->line($this->recruiter->email);
            case 'on-hold':
                return (new MailMessage)
                    ->subject('Update on your application for ' . $this->job->title . ' - Status: On Hold')
                    ->greeting('Dear ' . $notifiable->name . ',')
                    ->line('Thank you for your continued interest in the ' . $this->job->title . ' position at ' . $this->company->name . '.')
                    ->line('After careful consideration, we regret to inform you that your application is currently on hold as we continue to review other candidates for the position. While we are not moving forward with your application at this time, we would like to keep you in consideration for future opportunities.')
                    ->line('We will keep you updated on any changes to the status of your application. Thank you again for your interest in our company.')
                    ->line('Best regards,')
                    ->line($this->company->name)
                    ->line($this->recruiter->name)
                    ->line($this->recruiter->email);
            case 'rejected':
                return (new MailMessage)
                    ->subject('Application for ' . $this->job->title . ' - Status: Rejected')
                    ->greeting('Dear ' . $notifiable->name . ',')
                    ->line('Thank you for your interest in the ' . $this->job->title . ' position at ' . $this->company->name . '.')
                    ->line('After reviewing your application, we regret to inform you that we have decided to move forward with other candidates. This decision was not easy, as we received many strong applications, and we truly appreciate the time and effort you put into your application.')
                    ->line('We encourage you to apply for other openings at ' . $this->company->name . ' in the future, as we would love to stay in touch.')
                    ->line('Best wishes in your job search,')
                    ->line($this->company->name)
                    ->line($this->recruiter->name)
                    ->line($this->recruiter->email);
        }
    }

    /**
     * Get the array representation of the notification.
     *
     * @param mixed $notifiable
     * @return array
     */
    public function toDatabase($notifiable)
    {
        return [
            'status' => $this->application->status,
            'message' => 'Your job application status has been updated to ' . $this->application->status,
            'url' => url('/applications/' . $notifiable->id)
        ];
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
