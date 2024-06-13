Here is a simple console application in TypeScript that implements a job scheduler. This scheduler can execute jobs after a certain delay. The delay is specified in milliseconds.

```typescript
class Job {
    private id: number;
    private delay: number;
    private job: () => void;

    constructor(id: number, delay: number, job: () => void) {
        this.id = id;
        this.delay = delay;
        this.job = job;
    }

    public getId(): number {
        return this.id;
    }

    public getDelay(): number {
        return this.delay;
    }

    public getJob(): () => void {
        return this.job;
    }
}

class JobScheduler {
    private jobs: Job[] = [];

    public scheduleJob(id: number, delay: number, job: () => void): void {
        this.jobs.push(new Job(id, delay, job));
    }

    public executeJobs(): void {
        for (let job of this.jobs) {
            setTimeout(job.getJob(), job.getDelay());
        }
    }
}

let scheduler = new JobScheduler();

scheduler.scheduleJob(1, 2000, () => console.log("Job 1 executed after 2 seconds"));
scheduler.scheduleJob(2, 4000, () => console.log("Job 2 executed after 4 seconds"));
scheduler.scheduleJob(3, 6000, () => console.log("Job 3 executed after 6 seconds"));

scheduler.executeJobs();
```

In this code, we have a `Job` class that represents a job to be executed. Each job has an id, a delay, and a function to be executed.

The `JobScheduler` class is responsible for scheduling and executing jobs. It maintains a list of jobs. The `scheduleJob` method is used to schedule a new job. The `executeJobs` method is used to execute all scheduled jobs. It uses the `setTimeout` function to execute each job after the specified delay.