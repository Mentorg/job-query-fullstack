<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class RecruiterRegisteredNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct()
    {
        //
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
            ->subject('Your Job Board Account Has Been Successfully Created')
            ->greeting('Dear ' . $notifiable->name . ',')
            ->line('We\'re excited to let you know that your account on Job Query has been successfully created, and you\'re now ready to get started!')
            ->line('You can now log in to your account and begin posting job listings, managing applications, and engaging with potential candidates.')
            ->line('Login Details:')
            ->line('Username: ' . $notifiable->email)
            ->line('Password: ' . $notifiable->name . '123')
            ->action('Login to your account', url('http://localhost:5173/login'))
            ->line('If you have any questions or need further assistance, feel free to reach out to our support team at jobQuery@contact.com.')
            ->line('Thank you for choosing Job Query. We look forward to helping you find the perfect candidates for your job openings.')
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
