scheduleJob(job, delay) {
        const timeoutId = setTimeout(() => {
            job();
            this.jobs = this.jobs.filter(j => j.id !== timeoutId);
        }, delay);
        this.jobs.push({ id: timeoutId, job });
    }