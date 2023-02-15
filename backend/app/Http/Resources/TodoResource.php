<?php

namespace App\Http\Resources;

use App\Http\Resources\SubjectCollection;
use Illuminate\Http\Resources\Json\JsonResource;

class TodoResource extends JsonResource
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
            'user_id' => $this -> user_id,
            'title' => $this -> title,
            'share' => $this -> share,
            'password' => $this -> password,
            'updated_at' => $this -> updated_at,
            'subjects' => new SubjectCollection($this -> subjects)
        ];
    }
}
