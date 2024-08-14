import Store from "../models/storeModel.js";

const storeController = {
    createStore: async (req, res) => {
        try {
            const store = await Store.create(req.body);
            res.status(201).json(store);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getAllStores: async (req, res) => {
        try {
            const stores = await Store.getAll();
            res.status(200).json(stores);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getStoreById: async (req, res) => {
        try {
            const store = await Store.getById(req.params.id);
            if (store) {
                res.status(200).json(store);
            } else {
                res.status(404).json({ message: 'Store not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateStore: async (req, res) => {
        try {
            const store = await Store.update(req.params.id, req.body);
            res.status(200).json(store);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    deleteStore: async (req, res) => {
        try {
            const store = await Store.delete(req.params.id);
            res.status(200).json(store);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

export default storeController;