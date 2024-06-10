"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.job = void 0;
const cron_1 = require("cron");
class job {
    create(cronTime, onTick) {
        const job = new cron_1.CronJob(cronTime, onTick);
        job.start();
        return job;
    }
}
exports.job = job;
