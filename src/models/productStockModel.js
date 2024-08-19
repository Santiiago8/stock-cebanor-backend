import db from "../db.js";

const ProductStock = {
    create: async (productStock) => {
        try {
            const { product_id, store_id, stock_quantity } = productStock;
            const result = await db.one(
                'INSERT INTO product_stocks (product_id, store_id, stock_quantity) VALUES ($1, $2, $3) RETURNING *',
                [product_id, store_id, stock_quantity]
            );
            return result;
        } catch (error) {
            console.error({ error: error.message });
        }
    },

    getByStore: async (store_id) => {
        try {
            const result = await db.any(
                'SELECT * FROM product_stocks WHERE store_id = $1',
                [store_id]
            );
            return result;
        } catch (error) {
            console.error({ error: error.message });
        }
    },

    getByProduct: async (product_id) => {
        try {
            const result = await db.any(
                'SELECT * FROM product_stocks WHERE product_id = $1',
                [product_id]
            );
            return result;
        } catch (error) {
            console.error({ error: error.message });
        }
    },

    update: async (id, productStock) => {
        try {
            const { stock_quantity } = productStock;
            const result = await db.one(
                'UPDATE product_stocks SET stock_quantity = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
                [stock_quantity, id]
            );
            return result;
        } catch (error) {
            console.error({ error: error.message });
        }
    },
    
    // Actualizar stock de un producto en una tienda específica
    updateStock: async (product_id, store_id, stock_quantity) => {
        try {
            const result = await db.one(
                'UPDATE product_stocks SET stock_quantity = stock_quantity - $1 WHERE product_id = $2 AND store_id = $3 RETURNING *',
                [quantity, product_id, store_id]
            );

            return result;
        } catch (error) {
            console.log('Error al actualizar el stock', error);
            throw error;
        }
    },

    delete: async (id) => {
        try {
            const result = await db.result('DELETE FROM product_stocks WHERE id = $1', [id]);
            return result;
        } catch (error) {
            console.error({ error: error.message });
        }
    },
};

export default ProductStock;