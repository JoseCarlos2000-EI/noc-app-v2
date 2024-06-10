import { env } from "./plugins/env-var.plugin";
import { server } from "./presentation/server";


(
    () => //server.run() 
    console.log(env.PORT, 3000)
)();