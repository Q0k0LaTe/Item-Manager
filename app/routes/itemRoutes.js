import express from 'express';
import {
    getItems,
    getItem,
    addItem,
    updateItem,
    deleteItem,
    getCurrencyConversions
} from '../controllers/itemController.js';

const router = express.Router();

// API Routes
router.get('/api/items', getItems);
router.get('/api/items/:id', getItem);
router.post('/api/items', addItem);
router.put('/api/items/:id', updateItem);
router.delete('/api/items/:id', deleteItem);
router.get('/api/currency-rates', getCurrencyConversions);

// Web Routes
router.get('/', getItems);
router.post('/items', addItem);

export default router;