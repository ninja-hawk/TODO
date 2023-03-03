<?php

namespace App\Models;

use App\Models\Task;
use App\Models\Todo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Subject extends Model
{
    use HasFactory, SoftDeletes;
    // 論理削除SoftCascade用
    use \Askedio\SoftCascade\Traits\SoftCascadeTrait;

    // todoテーブルのupdated_atを更新
    protected $touches = ['todo'];
    // モデルに関連付けるテーブル
    protected $table = 'subjects';
    // Eloquentで更新・登録可能
    protected $fillable = [
        'name', 'todo_id'
    ];
    // 論理削除SoftCascade
    protected $softCascade = ['tasks'];

    public function todo()
    {
        return $this->belongsTo(Todo::class);
    }
    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
}
