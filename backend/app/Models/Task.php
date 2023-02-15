<?php

namespace App\Models;

use App\Models\Subject;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    // モデルに関連付けるテーブル
    protected $table = 'tasks';
    // Eloquentで更新・登録可能
    protected $fillable = [
        'text','due', 'time', 'done', 'mtg', 'priority','subject_id'
    ];

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }
}
