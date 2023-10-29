<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Tasklist extends Model
{
    use HasFactory;

    protected $primaryKey = "tasklist_id";

    protected $fillable = ["name", "is_pinned", "project_id"];

    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class, "tasklist_id");
    }

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class, "project_id");
    }

    public function user() {
        return $this->belongsTo(User::class);
    }
}
