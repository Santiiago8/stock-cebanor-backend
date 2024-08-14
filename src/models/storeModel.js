import db from "../db.js";

const Store = {
    create: async (store) => {
        try {
            const { name } = store;
            const result = await db.one(
                'INSERT INTO stores (name) VALUES ($1) RETURNING *',
                [name]
            );
            return result;
        } catch (error) {
            console.error({ error: error.message });
        }
    },

    getAll: async () => {
        try {
            const result = await db.any(
                'SELECT * FROM stores'
            );
            return result;
        } catch (error) {
            console.error({ error: error.message });
        }
    },

    getById: async (id) => {
        try {
            const result = await db.oneOrNone(
                'SELECT * FROM stores WHERE id = $1',
                [id]
            );
            return result;
        } catch (error) {
            console.error({ error: error.message });
        }
    },

    update: async (id, store) => {
        try {
            const { name } = store;
            const result = await db.one(
                'UPDATE stores SET name = $1 WHERE id = $2 RETURNING *',
                [name, id]
            );
            return result;
        } catch (error) {
            console.error({ error: error.message });
        }
    },

    delete: async (id) => {
        try {
            const result = await db.result('DELETE FROM stores WHERE id = $1', [id]);
            return result;
        } catch (error) {
            console.error({ error: error.message });
        }
    },
};

export default Store;