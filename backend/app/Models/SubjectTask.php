<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubjectTask extends Model
{
    use HasFactory;
    // モデルに関連付けるテーブル
    protected $table = 'subject_todos';

}
