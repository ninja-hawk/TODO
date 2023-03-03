<?php

namespace App\Models;

use App\Models\Task;
use App\Models\Todo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    use HasFactory;
    // todoテーブルのupdated_atを更新
    protected $touches = ['todo'];
    // モデルに関連付けるテーブル
    protected $table = 'subjects';
    // Eloquentで更新・登録可能
    protected $fillable = [
        'name', 'todo_id'
    ];

    public function todo()
    {
        return $this->belongsTo(Todo::class);
    }
    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
}
