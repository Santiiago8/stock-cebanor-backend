import { config } from 'dotenv';
import pgPromise from 'pg-promise';

config();

const pgp = pgPromise();
const db = pgp({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
});

db.connect()
    .then(obj => {
        console.log('conexion exitosa a la base de datos');
        obj.done(); //libera el recurso de conexion
    })
    .catch(err => {
        console.error('Error en la conexion con la base de datos ', err);
    });

export default db;