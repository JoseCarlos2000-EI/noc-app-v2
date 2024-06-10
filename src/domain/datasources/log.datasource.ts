import { logEntity, severityEnum } from "../entities/log.entity";


export abstract class logDatasource{
    abstract saveLog( log: logEntity ): Promise<void>;
    abstract getLog ( severity : severityEnum ): Promise<logEntity[]>;
} 