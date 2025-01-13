import Item from '../models/itemModel.js';
import axios from 'axios';

// Get all items with filtering and sorting
export const getItems = async (req, res) => {
    try {
        const { sort, category, search } = req.query;
        let query = {};
        
        // Search functionality
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }
        
        // Category filter
        if (category) {
            query.category = category;
        }
        
        // Build sort object
        let sortObj = {};
        if (sort) {
            switch (sort) {
                case 'priceAsc':
                    sortObj.price = 1;
                    break;
                case 'priceDesc':
                    sortObj.price = -1;
                    break;
                case 'nameAsc':
                    sortObj.name = 1;
                    break;
                case 'nameDesc':
                    sortObj.name = -1;
                    break;
                default:
                    sortObj.createdAt = -1;
            }
        }
        
        const items = await Item.find(query).sort(sortObj);
        
        // If it's an API request, send JSON
        if (req.xhr || req.headers.accept.indexOf('json') > -1) {
            return res.json({ success: true, data: items });
        }
        
        // Otherwise render the page
        res.render('home', {
            title: 'Item Manager',
            message: 'Manage your items below.',
            items
        });
    } catch (err) {
        console.error('Error fetching items:', err);
        res.status(500).json({ success: false, error: 'Error fetching items' });
    }
};

// Get single item
export const getItem = async (req, res) => {
    try {
        console.log('Getting item with ID:', req.params.id);
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ success: false, error: 'Item not found' });
        }
        res.json({ success: true, data: item });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Error fetching item' });
    }
};

// Create new item
export const addItem = async (req, res) => {
    try {
        const newItem = new Item(req.body);
        await newItem.save();
        
        if (req.xhr || req.headers.accept.indexOf('json') > -1) {
            return res.json({ success: true, data: newItem });
        }
        
        req.flash('success_msg', 'Item added successfully!');
        res.redirect('/');
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ 
                success: false, 
                error: Object.values(err.errors).map(e => e.message)
            });
        }
        res.status(500).json({ success: false, error: 'Error adding item' });
    }
};

// Update item
export const updateItem = async (req, res) => {
    try {
        const item = await Item.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!item) {
            return res.status(404).json({ success: false, error: 'Item not found' });
        }
        
        res.json({ success: true, data: item });
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ 
                success: false, 
                error: Object.values(err.errors).map(e => e.message)
            });
        }
        res.status(500).json({ success: false, error: 'Error updating item' });
    }
};

// Delete item
export const deleteItem = async (req, res) => {
    try {
        console.log('Deleting item with ID:', req.params.id);
        const item = await Item.findByIdAndDelete(req.params.id);
        
        if (!item) {
            return res.status(404).json({ success: false, error: 'Item not found' });
        }
        
        res.json({ success: true, data: {} });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Error deleting item' });
    }
};

// Get currency conversions
export const getCurrencyConversions = async (req, res) => {
    try {
        const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
        res.json({ success: true, data: response.data.rates });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Error fetching currency rates' });
    }
};