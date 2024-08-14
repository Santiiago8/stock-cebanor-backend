import User from "../models/userModel.js";

const userController = {
    createUser: async (req, res) => {
        try {
            const user = await User.create(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getAllUsers: async (req, res) => {
        try {
            const user = await User.getAllUsers();
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getUserById: async (req, res) => {
        try {
            const user = await User.getUserById(req.params.id);
            if (user) {
                res.status(200).json(user)
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    loginUser: async (req, res) => {
        const { nombre, contrasena } = req.body;

        try {
            const user = await User.getByUsername(nombre);
            if (user && user.contrasena === contrasena) {
                res.status(200).json({ 
                    user: {
                        id: user.id,
                        nombre: user.nombre,
                        apellido: user.apellido,
                        isSuperAdmin: user.isSuperAdmin
                    }
                 });
            } else {
                res.status(401).json({ message: 'Nombre de usuario o contraseña incorrectos.' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateUser: async (req, res) => {
        try {
            const user = await User.update(req.params.id, req.body);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    deleteUser: async (req, res) => {
        try {
            const user = await User.delete(req.params.id);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default userController;