<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Task extends Model
{
    use HasFactory;

    protected $primaryKey = "task_id";
    protected $fillable = ["name", "status_id", "is_priority", "description", "tasklist_id"];

    public function status(): BelongsTo
    {
        return $this->belongsTo(Status::class, "status_id");
    }

    public function tasklist(): BelongsTo
    {
        return $this->belongsTo(Tasklist::class, "tasklist_id");
    }

    public function subtasks(): HasMany
    {
        return $this->hasMany(Subtask::class, "task_id");
    }

    public function linkedTasks()
    {
        return $this->belongsToMany(Task::class, 'task_task', 'task_id', 'related_task_id');
    }

    public function user() {
        return $this->belongsTo(User::class);
    }
}
