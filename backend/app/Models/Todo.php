<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    use HasFactory;

    // モデルに関連付けるテーブル
    protected $table = 'todos';
    // Eloquentで更新・登録可能
    protected $fillable = [
        'title', 'share', 'password'
    ];


}
