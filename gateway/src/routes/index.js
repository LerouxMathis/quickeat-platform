const express = require('express');
const router = express.Router();
const { restaurantBreaker, menuBreaker, orderBreaker } = require('../services/breakers');

// Endpoint simple pour tester Gateway
router.get('/health', (req, res) => res.json({ status: 'ok' }));

// Exemple route restaurant
router.get('/restaurants/:id', async (req, res) => {
  try {
    const response = await restaurantBreaker.fire(req.params.id);
    res.json(response.data);
  } catch (err) {
    res.status(503).json({ error: 'Restaurant service unavailable' });
  }
});

// Exemple route menu
router.get('/dishes/:id', async (req, res) => {
  try {
    const response = await menuBreaker.fire(req.params.id);
    res.json(response.data);
  } catch (err) {
    res.status(503).json({ error: 'Menu service unavailable' });
  }
});

module.exports = router;