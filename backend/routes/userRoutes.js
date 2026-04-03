const express = require('express');
const router = express.Router();

// Sample in-memory users
const users = [
  { id: 1, name: 'Alice Johnson', email: 'alice@zorvyn.com', role: 'admin' },
  { id: 2, name: 'Bob Smith', email: 'bob@zorvyn.com', role: 'user' },
  { id: 3, name: 'Carol White', email: 'carol@zorvyn.com', role: 'user' },
];

// GET all users
router.get('/', (req, res) => {
  res.json({ success: true, data: users, total: users.length });
});

// GET user by ID
router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ success: false, error: 'User not found' });
  res.json({ success: true, data: user });
});

// POST create user
router.post('/', (req, res) => {
  const { name, email, role = 'user' } = req.body;
  if (!name || !email) {
    return res.status(400).json({ success: false, error: 'Name and email are required' });
  }
  const newUser = { id: users.length + 1, name, email, role };
  users.push(newUser);
  res.status(201).json({ success: true, data: newUser, message: 'User created successfully' });
});

// PUT update user
router.put('/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ success: false, error: 'User not found' });
  users[index] = { ...users[index], ...req.body };
  res.json({ success: true, data: users[index], message: 'User updated successfully' });
});

// DELETE user
router.delete('/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ success: false, error: 'User not found' });
  users.splice(index, 1);
  res.json({ success: true, message: 'User deleted successfully' });
});

module.exports = router;
