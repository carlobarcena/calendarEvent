<?php

namespace App\Repository;

use Illuminate\Support\Facades\DB;

class EventRepository
{   
    /**
     * Save/Update the Event in DB
     */
    public function saveEvent($param)
    {
        $param['checked_dates'] = json_encode($param['checked_dates']);
        return DB::table('t_events')->updateOrInsert(
            ['event_id' => data_get($param, 'event_id')],
            $param
        );
    }

    /**
     * Get Record in DB
     */
    public function getEvent()
    {
        $result = DB::table('t_events')->get();
        $result = collect($result)->toArray();
        return $result;
    }
}
