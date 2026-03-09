const CircuitBreaker = require('opossum');
const axios = require('axios');
const config = require('../config/config');

const restaurantBreaker = new CircuitBreaker(
  (id) => axios.get(`${config.RESTAURANT_SERVICE_URL}/restaurants/${id}`),
  { timeout: 3000, errorThresholdPercentage: 50, resetTimeout: 10000 }
);

const menuBreaker = new CircuitBreaker(
  (id) => axios.get(`${config.MENU_SERVICE_URL}/dishes/${id}`),
  { timeout: 3000, errorThresholdPercentage: 50, resetTimeout: 10000 }
);

const orderBreaker = new CircuitBreaker(
  (orderId) => axios.get(`${config.ORDER_SERVICE_URL}/orders/${orderId}`),
  { timeout: 3000, errorThresholdPercentage: 50, resetTimeout: 10000 }
);

module.exports = {
  restaurantBreaker,
  menuBreaker,
  orderBreaker
};