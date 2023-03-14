<?php

namespace App\Models;

use App\Models\Subject;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Todo extends Model
{
    use HasFactory, SoftDeletes;
    // 論理削除SoftCascade用
    use \Askedio\SoftCascade\Traits\SoftCascadeTrait;

    // モデルに関連付けるテーブル
    protected $table = 'todos';
    // Eloquentで更新・登録可能
    protected $fillable = [
        'title', 'share', 'password','user_id'
    ];
    // 論理削除SoftCascade
    protected $softCascade = ['subjects'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function subjects()
    {
        return $this->hasMany(Subject::class);
    }
}
