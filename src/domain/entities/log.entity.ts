export enum severityEnum  {
    high = "high",
    medium = "medium",
    low = "low"
};


export class logEntity {
    public severity  : severityEnum;
    public content : string;
    public createAt : Date;
    constructor(
        severity: severityEnum,
        content : string
    ){
        this.severity = severity;
        this.content = content;
        this.createAt = new Date();
    }

    static jsonSerializer(json : string): logEntity{
        const { severity, content, createAt } = JSON.parse(json);
        const logEntityInstance = new logEntity(severity, content);
        logEntityInstance.createAt = createAt;
        return logEntityInstance;
    }
}