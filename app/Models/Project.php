<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
    use HasFactory;

    protected $primaryKey = "project_id";
    protected $fillable = ["name", "is_pinned"];

    public function tasklists(): HasMany
    {
        return $this->hasMany(Tasklist::class, "project_id");
    }
}
