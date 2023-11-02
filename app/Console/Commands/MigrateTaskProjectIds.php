<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Task;
use App\Models\Tasklist;

class MigrateTaskProjectIds extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'migrate:task-project-ids';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Migrate project_ids to tasks table from tasklists';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $tasks = Task::all();

        foreach ($tasks as $task) {
            $tasklist = Tasklist::find($task->tasklist_id);

            if ($tasklist) {
                $projectId = $tasklist->project_id;
                $task->project_id = $projectId;
                $task->save();
            }
        }

        $this->info('Data migration completed');

        return 0;
    }
}
