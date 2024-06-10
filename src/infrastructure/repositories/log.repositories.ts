import { logDatasource } from "../../domain/datasources/log.datasource";
import { logEntity, severityEnum } from "../../domain/entities/log.entity";


export class logRepository implements logDatasource{
    constructor(
        private readonly dataSource : logDatasource
    ){}
    async saveLog(log: logEntity): Promise<void> {
        this.dataSource.saveLog(log);
    }
    getLog(severity: severityEnum): Promise<logEntity[]> {
        return this.dataSource.getLog(severity);
    }

}