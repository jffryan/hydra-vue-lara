<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Subtask extends Model
{
    use HasFactory;

    protected $primaryKey = "subtask_id";
    protected $fillable = ["text", "is_complete"];

    public function task(): BelongsTo
    {
        return $this->belongsTo(Task::class, "task_id");
    }
}
