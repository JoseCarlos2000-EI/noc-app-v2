import { logRepository } from "../../infrastructure/repositories/log.repositories";
import { logEntity, severityEnum } from "../entities/log.entity";

interface checkServiceType {
    execute : ( url : string ) => Promise<Boolean>;
}

type successCallback = () => void;
type errorCallback = ( error: string )=> void;

export class checkService implements checkServiceType {
    constructor(
        private readonly logDatasource: logRepository,
        private readonly successCallback ?: successCallback,
        private readonly  errorCallback?: errorCallback
    ){}
    public async execute(url: string){
        try{
            
            const req = await fetch(url, {method: 'GET'});
            if( !req.ok ) throw new Error("Error in service !!");
            this.successCallback && this.successCallback();
            this.logDatasource.saveLog(new logEntity(severityEnum.low, 'Service is working!!'));
            return true;
        }catch(e){
            this.errorCallback && this.errorCallback(`${e}`);
            this.logDatasource.saveLog(new logEntity(severityEnum.high, `${e}`));
            return false;
        }
    }
}