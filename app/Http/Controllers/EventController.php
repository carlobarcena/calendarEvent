<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use App\Repository\EventRepository;
use Illuminate\Http\Request;

class EventController extends Controller
{
    
    private $repository;

    /**
     * Event Repository Constructor
     */
    public function __construct(EventRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Get the Event
     */
    public function getEvent() {
        $result = $this->repository->getEvent();
        return $result;
    }

    /**
     * Save the Event
     */
    public function saveEvent(Request $request) {
        return $this->repository->saveEvent($request->all());
    }
}
