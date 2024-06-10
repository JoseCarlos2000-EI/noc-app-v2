import { logEntity, serverityEnum } from "../entities/log.entity";


export abstract class logRepository{
    abstract saveLog( log: logEntity ): () => Promise<void>;
    abstract getLog ( severity : serverityEnum ): Promise<logEntity[]>;
} 