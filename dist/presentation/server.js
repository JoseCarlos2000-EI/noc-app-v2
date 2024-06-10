"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const create_job_1 = require("./cron/create-job");
class server {
    static run() {
        new create_job_1.job().create('*/3 * * * * *', () => {
            console.log("Hola mundo " + new Date());
        });
    }
}
exports.server = server;
