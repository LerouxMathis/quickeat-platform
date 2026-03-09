const express = require('express');
const router = express.Router();
const menuService = require('../services/menuService');
const axios = require('axios');
const log = require('../utils/logger');

// GET /menus/:restaurantId
router.get('/:restaurantId', async (req, res) => {
  const { restaurantId } = req.params;
  const { category, available } = req.query;

  const dishes = menuService.getDishesByRestaurant(restaurantId, { category, available });
  res.json(dishes);
});

// GET /dishes/:id
router.get('/dish/:id', (req, res) => {
  const dish = menuService.getDish(req.params.id);
  if (!dish) return res.status(404).json({ error: 'Dish not found' });
  res.json(dish);
});

// POST /dishes
router.post('/', async (req, res) => {
  const { restaurantId, name, description, price, category } = req.body;

  // Vérification RestaurantService (mode dégradé)
  try {
    const resp = await axios.get(`${process.env.RESTAURANT_SERVICE_URL}/restaurants/${restaurantId}`);
    if (resp.data.status === 'CLOSED' || resp.data.status === 'RENOVATION') {
      return res.status(400).json({ error: `Le restaurant ${restaurantId} est fermé` });
    }
  } catch (err) {
    log('warn', `Restaurant Service unreachable. Creating dish with restaurantVerified=false`, { error: err.message });
    req.body.restaurantVerified = false;
  }

  const dish = menuService.addDish(req.body);
  res.status(201).json(dish);
});

// PUT /dishes/:id
router.put('/:id', (req, res) => {
  const dish = menuService.updateDish(req.params.id, req.body);
  if (!dish) return res.status(404).json({ error: 'Dish not found' });
  res.json(dish);
});

// DELETE /dishes/:id
router.delete('/:id', (req, res) => {
  const success = menuService.deleteDish(req.params.id);
  if (!success) return res.status(404).json({ error: 'Dish not found' });
  res.json({ deleted: true });
});

// POST /dishes/promo
router.post('/promo', (req, res) => {
  const { dishData, restaurantIds } = req.body;
  const promos = menuService.pushPromo(dishData, restaurantIds);
  res.status(201).json(promos);
});

module.exports = router;