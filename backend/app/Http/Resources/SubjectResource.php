<?php

namespace App\Http\Resources;
use App\Http\Resources\TaskCollection;
use Illuminate\Http\Resources\Json\JsonResource;

class SubjectResource extends JsonResource
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
            'name' => $this -> name,
            'todo_id' => $this -> todo_id,
            'tasks' => new TaskCollection($this->tasks)
        ];
    }
}
