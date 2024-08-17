import db from "../db.js";

const User = {
    //Crear user
    create: async (user) => {
        try {
            const { nombre, apellido, contrasena, isSuperAdmin } = user;
            const result = await db.one(
                'INSERT INTO users (nombre, apellido, contrasena, isSuperAdmin) VALUES ($1, $2, $3, $4) RETURNING *',
                [nombre, apellido, contrasena, isSuperAdmin]
            );
            return result
        } catch (error) {
            console.error({error: error.message});
        }
    },

    //Obtener todos los user
    getAllUsers: async () => {
        try {
            const result = await db.any(
                'SELECT * FROM users'
            )
            return result;
        } catch (error) {
            console.error({error: error.message});
        }
    },

    //Obtener user por el id
    getById: async (id) => {
        try {
            const result = await db.oneOrNone(
                'SELECT * FROM users WHERE id = $1',
                [id]
            );
            return result;
        } catch (error) {
            console.error({error: error.message});
        }
    },

    getByUsername: async (nombre) => {
        return await db.oneOrNone('SELECT id, nombre, apellido, contrasena, isSuperAdmin FROM users WHERE nombre = $1', [nombre]);
    },

    //Actualizar usuario
    update: async (id, user) => {
        try {
            const { nombre, apellido, contrasena, isSuperAdmin } = user;
            const result = await db.one(
                'UPDATE users SET nombre = $1, apellido = $2, contrasena = $3, isSuperAdmin = $4, id = $5 RETURNING *',
                [nombre, apellido, contrasena, isSuperAdmin, id]
            );
            return result;
        } catch (error) {
            console.error({error: error.message});
        }
    },

    //Borrar user
    delete: async (id) => {
        try {
            const result = await db.result(
                'DELETE FROM users WHERE id = $1',
                [id]
            );
            return result;
        } catch (error) {
            console.error({error: error.message});
        }
    },
};

export default User;