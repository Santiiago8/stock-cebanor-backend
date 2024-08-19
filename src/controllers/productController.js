import Product from "../models/productModel.js";
import ProductStock from '../models/productStockModel.js';

const productController = {
    createProduct: async (req, res) => {
        try {
            const product = await Product.create(req.body);
            res.status(201).json(product);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    createProductWithStock: async (req, res) => {
        const { nombre, descripcion, precio, stock } = req.body;
        console.log(req.body);
        try {
            const newProduct = await Product.create({ nombre, descripcion, precio });

            // Insertar stock para cada tienda seleccionada
            if (stock && stock.length > 0) {
                for (let stockItem of stock) {
                    await ProductStock.create({
                        product_id: newProduct.id,
                        store_id: stockItem.store_id,
                        stock_quantity: stockItem.stock_quantity
                    });
                }
            }

            res.status(201).json({ message: 'Producto creado exitosamente', product: newProduct });
        } catch (error) {
            console.error('Error al crear el producto:', error);
            res.status(500).json({ error: error.message });
        }
    },

    updateProductStock: async (req, res) => {
        const { productId, storeId, quantity } = req.body;
        try {
            const updateStock = await ProductStock.updateStock(productId, storeId, quantity);
            res.status(200).json({ message: 'Stock actualizado', updatedStock });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getAllProducts: async (req, res) => {
        try {
            const products = await Product.getAllProducts();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getProductById: async (req, res) => {
        try {
            const product = await Product.getProductById(req.params.id);
            if (product) {
                res.status(200).json(product);
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateProduct: async (req, res) => {
        try {
            const product = await Product.update(req.params.id, req.body);
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    deleteProduct: async (req, res) => {
        try {
            const product = await Product.getById(req.params.id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            await Product.delete(req.params.id);
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

}

export default productController;