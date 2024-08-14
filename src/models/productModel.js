import db from "../db.js";

const Product = {
    //Crear nuevo producto
    create: async (product) => {
        try {
            const { nombre, descripcion, precio } = product;
            const result = await db.one(
                'INSERT INTO products (nombre, descripcion, precio) VALUES ($1, $2, $3) RETURNING *',
                [nombre, descripcion, precio]
            )
            return result;
        } catch (error) {
            console.error({error: error.message});
        }
    },

    //Obtener todos los productos
    getAllProducts: async () => {
        try {
            const result = await db.any(
                'SELECT * FROM products'
            );
            return result;
        } catch (error) {
            console.error({error: error.message});
        }
    },

    //Obtener por id
    getById: async (id) => {
        try {
            const result = await db.oneOrNone(
                'SELECT * FROM products WHERE id = $1',
                [id]
            );
            return result
        } catch (error) {
            console.error({error: error.message});
        }
    },

    //Actualizar producto
    update: async (id, product) => {
        try {
            const { nombre, descripcion, precio } = product;
            const result = await db.one(
                'UPDATE products SET nombre = $1, descripcion = $2, precio = $3 WHERE id = $4',
                [nombre, descripcion, precio, id]
            );
            return result;
        } catch (error) {
            console.error({error: error.message});
        }
    },

    //Borrar producto
    delete: async (id) => {
        try {
            const result = await db.result(
                'DELETE FROM products WHERE id = $1', 
                [id]
            )
            return result;
        } catch (error) {
            
        }
    },
};

export default Product;