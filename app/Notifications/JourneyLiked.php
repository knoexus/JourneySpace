<?php

namespace App\Notifications;

use App\Notifications\JourneyNotification;

use App\Models\User;
use App\Models\Journey;

class JourneyLiked extends JourneyNotification
{
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(User $sender, int $journey_id)
    {
        parent::__construct($sender, $journey_id);
    }
}
