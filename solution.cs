Here is a simple implementation of a job scheduler in JavaScript using setTimeout function:

```javascript
class JobScheduler {
    constructor() {
        this.jobs = [];
    }

    scheduleJob(job, delay) {
        const timeoutId = setTimeout(() => {
            job();
            this.jobs = this.jobs.filter(j => j.id !== timeoutId);
        }, delay);
        this.jobs.push({ id: timeoutId, job });
    }

    cancelJob(jobId) {
        const job = this.jobs.find(j => j.id === jobId);
        if (job) {
            clearTimeout(job.id);
            this.jobs = this.jobs.filter(j => j.id !== jobId);
        }
    }
}

// Usage
const scheduler = new JobScheduler();

const jobId = scheduler.scheduleJob(() => {
    console.log('Job executed!');
}, 2000);

// To cancel a job
// scheduler.cancelJob(jobId);
```

This JobScheduler class has a method scheduleJob that takes a job (a function) and a delay (in milliseconds). It uses setTimeout to schedule the job to be executed after the delay. The timeoutId returned by setTimeout is stored along with the job in an array. This allows us to cancel the job later if needed using clearTimeout. The cancelJob method takes a jobId, finds the corresponding job in the array, cancels it using clearTimeout, and removes it from the array.