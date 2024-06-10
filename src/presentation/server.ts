import { logDatasource } from "../domain/datasources/log.datasource";
import { checkService } from "../domain/use-case/check-service.use-case";
import { fileSystem } from "../infrastructure/datasources/file-system.datasource";
import { logRepository } from "../infrastructure/repositories/log.repositories";
import { job } from "./cron/create-job";

const logEntityInstance = new logRepository(
    new fileSystem()
);

export class server {
    public static run (){
        new job().create(
            '*/3 * * * * *',
            () => {
                new checkService(
                    logEntityInstance
                ).execute("http://localhost:3000/posts");
            }
        );
    } 
}