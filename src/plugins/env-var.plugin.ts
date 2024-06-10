import 'dotenv/config';
import * as global from 'env-var';

export const env = {
    PORT: global.get('PORT').required().asPortNumber(),
    EMAIL: global.get('MAILER_SEND').required().asEmailString()
}