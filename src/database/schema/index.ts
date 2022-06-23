import { appSchema } from "@nozbe/watermelondb/Schema";
import { carSchema } from "./carSchema";
import { userSchema } from './userSchema';

const schemas = appSchema({
    version: 2,//precisa subir uma nova versão do banco sempre que ele sofrer alguma alteração
    tables: [
        userSchema,
        carSchema
    ]
});

export { schemas };
