<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this -> id,
            'subject_id' => $this -> subject_id,
            'text' => $this -> text,
            'due' => $this -> due,
            'time' => $this -> time,
            'done' => $this -> done,
            'mtg' => $this -> mtg,
            'priority' => $this -> priority,
        ];
    }
}
