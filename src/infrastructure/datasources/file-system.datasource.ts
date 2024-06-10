import { logDatasource } from "../../domain/datasources/log.datasource";
import { logEntity, severityEnum } from "../../domain/entities/log.entity";
import fs from 'fs';

export type severityOptions = severityEnum | 'all';

export class fileSystem implements logDatasource{

    private readonly logPath: string = './log';
    private readonly allPath : string = './log/all-level.log';
    private readonly mediumPath : string = './log/medium-level.log';
    private readonly highPath : string = './log/high-level.log';
    private readonly lowPath : string = './log/low-level.log';
    private readonly logFiles: string[] = [this.mediumPath, this.highPath, this.lowPath];
    private readonly generata_files : () => void = () => {
        if(!fs.existsSync(this.logPath)) fs.mkdirSync(this.logPath, {recursive: true});
        if(!fs.existsSync(this.allPath)) fs.writeFileSync(this.allPath, '');
        this.logFiles.forEach(k => {
            if(!fs.existsSync(k)) fs.writeFileSync(k, '');
        });
    }; 
    constructor(){
        this.generata_files();
    }
    async saveLog(log: logEntity): Promise<void> {
        const appendFile : (path:string, content: logEntity) => void  = (path: string, content: logEntity): void => fs.appendFileSync(path , `${JSON.stringify(content)}\n` );

        appendFile( this.allPath, log );

        switch(log.severity) {
            case severityEnum.high:
                appendFile(this.highPath, log);
                break;
            case severityEnum.medium:
                appendFile(this.mediumPath, log);
                break;
            case severityEnum.low:
                appendFile(this.lowPath, log);
        };
    }
    async getLog(severity: severityOptions): Promise<logEntity[]> {

        const getFileSeverity = (path: string): logEntity[] => {
                const content =  fs.readFileSync(path, {encoding: 'utf-8'});
                const logArray = content.split('\n').map(k => logEntity.jsonSerializer(k));
                return logArray;
            };

        switch(severity) {
            case severityEnum.high:
                return getFileSeverity(this.highPath);
            case severityEnum.low:
                return getFileSeverity(this.lowPath);
            case severityEnum.medium:
                return getFileSeverity(this.mediumPath);
            case 'all':
                return getFileSeverity(this.allPath);
            default:
                throw new Error('Severity not found!!');
        }
    }

}