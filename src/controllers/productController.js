import Product from "../models/productModel.js";

const productController = {
    createProduct: async (req, res) => {
        try {
            const product = await Product.create(req.body);
            res.status(201).json(product);
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