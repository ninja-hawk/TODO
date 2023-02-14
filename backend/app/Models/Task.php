<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    // モデルに関連付けるテーブル
    protected $table = 'tasks';
    // Eloquentで更新・登録可能
    protected $fillable = [
        'text','due', 'time', 'done', 'mtg', 'priority'
    ];
}
