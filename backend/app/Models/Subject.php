<?php

namespace App\Models;

use App\Models\Todo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    use HasFactory;

    // モデルに関連付けるテーブル
    protected $table = 'subjects';
    // Eloquentで更新・登録可能
    protected $fillable = [
        'name'
    ];

    public function todo()
    {
        return $this->belongsTo(Todo::class);
    }

}
