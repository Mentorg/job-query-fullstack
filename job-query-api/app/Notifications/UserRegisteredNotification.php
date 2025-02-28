<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class UserRegisteredNotification extends Notification
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
            ->subject('Welcome to JobQuery - Your Job Search Starts Here!')
            ->greeting('Hello ' . $notifiable->name . ',')
            ->line("Thank you for signing up at Job Query! We're excited to have you on board as part of our community. Whether you're looking for your next job opportunity or aiming to hire top talent, we've got you covered.")
            ->line('To get started, feel free to complete your profile, explore the latest job listings, and set up job alerts so you never miss an opportunity.')
            ->line('If you have any questions or need assistance, our team is always here to help!')
            ->action('Visit Us', 'http://localhost:5173')
            ->line('Best regards,')
            ->line('The Job Query Team');
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
