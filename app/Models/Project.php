<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
    use HasFactory;

    protected $primaryKey = "project_id";
    protected $fillable = ["name", "description", "is_pinned"];

    public function tasklists(): HasMany
    {
        return $this->hasMany(Tasklist::class, "project_id");
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class, 'project_id');
    }
}
