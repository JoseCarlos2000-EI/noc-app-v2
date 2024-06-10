import { CronJob } from 'cron'

type cronTimeType = string | Date;
type onTickType = () => void;

interface jobs {
    create : (cronTime: cronTimeType, onTick: onTickType) => CronJob;
}

export class job implements jobs{
    
    public create(cronTime: cronTimeType, onTick: onTickType ){
        const job = new CronJob( cronTime,  onTick );
        job.start()
        return job;
    }

}