require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 4000,
  RESTAURANT_SERVICE_URL: process.env.RESTAURANT_SERVICE_URL || "http://restaurant-service:3001",
  MENU_SERVICE_URL: process.env.MENU_SERVICE_URL || "http://menu-service:3002",
  ORDER_SERVICE_URL: process.env.ORDER_SERVICE_URL || "http://order-service:3003",
  NOTIFICATION_SERVICE_URL: process.env.NOTIFICATION_SERVICE_URL || "http://notification-service:3004",
  LOG_LEVEL: process.env.LOG_LEVEL || "info"
};