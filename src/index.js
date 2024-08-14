import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js'
import productsRoutes from './routes/productRoutes.js'
import storeRoutes from './routes/storeRoutes.js';
import productStockRoutes from './routes/productStockRoutes.js';

config();

const app = express();
const PORT = process.env.PORT;

//Middleware para manejar JSON
app.use(express.json());
app.use(cors());
// Rutas
app.use('/users', userRoutes);
app.use('/products', productsRoutes);
app.use('/stores', storeRoutes);
app.use('/product-stocks', productStockRoutes);

//iniciar sv
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});