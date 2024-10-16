import db from "../db.js";

const Product = {
    // Crear nuevo producto
    create: async (product) => {
        try {
            const { nombre, descripcion, precio } = product;
            const result = await db.one(
                'INSERT INTO products (nombre, descripcion, precio) VALUES ($1, $2, $3) RETURNING *',
                [nombre, descripcion, precio]
            );
            return result;
        } catch (error) {
            console.error({ error: error.message });
            throw error;
        }
    },

    // Obtener todos los productos
    getAllProducts: async () => {
        try {
            const productsQuery = `
              SELECT p.id, p.nombre, p.descripcion, p.precio,
                     json_agg(json_build_object('store_id', ps.store_id, 'store_name', s.name, 'stock', ps.stock_quantity)) AS stores
              FROM products p
              LEFT JOIN product_stocks ps ON p.id = ps.product_id
              LEFT JOIN stores s ON ps.store_id = s.id
              GROUP BY p.id
            `;
            const rows = await db.any(productsQuery);
            return rows;
        } catch (error) {
            console.error('Error al obtener productos', error);
            throw error;
        }
    },

    // Obtener por id
    getById: async (id) => {
        try {
            const productQuery = `
                SELECT p.id, p.nombre, p.descripcion, p.precio,
                       json_agg(json_build_object('store_id', ps.store_id, 'store_name', s.name, 'stock', ps.stock_quantity)) AS stores
                FROM products p
                LEFT JOIN product_stocks ps ON p.id = ps.product_id
                LEFT JOIN stores s ON ps.store_id = s.id
                WHERE p.id = $1
                GROUP BY p.id
            `;
            const result = await db.oneOrNone(productQuery, [id]);
            return result;
        } catch (error) {
            console.error('Error al obtener producto por ID', error);
            throw error;
        }
    },
    

    // Actualizar producto
    update: async (id, product) => {
        try {
            const { nombre, descripcion, precio } = product;
            const result = await db.one(
                'UPDATE products SET nombre = $1, descripcion = $2, precio = $3 WHERE id = $4 RETURNING *',
                [nombre, descripcion, precio, id]
            );
            return result;
        } catch (error) {
            console.error({ error: error.message });
            throw error;
        }
    },

    // Borrar producto
    delete: async (id) => {
        try {
            const result = await db.result(
                'DELETE FROM products WHERE id = $1 RETURNING *',
                [id]
            );
            return result;
        } catch (error) {
            console.error('Error al borrar producto', error);
            throw error;
        }
    },
};

export default Product;