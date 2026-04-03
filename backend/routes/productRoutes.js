const express = require('express');
const router = express.Router();

// Sample in-memory products
const products = [
  { id: 1, name: 'Zorvyn Pro', category: 'Software', price: 99.99, stock: 50, description: 'Professional tier subscription' },
  { id: 2, name: 'Zorvyn Starter', category: 'Software', price: 29.99, stock: 200, description: 'Starter plan for individuals' },
  { id: 3, name: 'Zorvyn Enterprise', category: 'Software', price: 499.99, stock: 10, description: 'Full suite for large teams' },
];

// GET all products
router.get('/', (req, res) => {
  const { category } = req.query;
  const data = category ? products.filter(p => p.category === category) : products;
  res.json({ success: true, data, total: data.length });
});

// GET product by ID
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ success: false, error: 'Product not found' });
  res.json({ success: true, data: product });
});

// POST create product
router.post('/', (req, res) => {
  const { name, category, price, stock, description } = req.body;
  if (!name || !price) {
    return res.status(400).json({ success: false, error: 'Name and price are required' });
  }
  const newProduct = { id: products.length + 1, name, category, price, stock: stock || 0, description };
  products.push(newProduct);
  res.status(201).json({ success: true, data: newProduct, message: 'Product created successfully' });
});

// PUT update product
router.put('/:id', (req, res) => {
  const index = products.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ success: false, error: 'Product not found' });
  products[index] = { ...products[index], ...req.body };
  res.json({ success: true, data: products[index], message: 'Product updated successfully' });
});

// DELETE product
router.delete('/:id', (req, res) => {
  const index = products.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ success: false, error: 'Product not found' });
  products.splice(index, 1);
  res.json({ success: true, message: 'Product deleted successfully' });
});

module.exports = router;
