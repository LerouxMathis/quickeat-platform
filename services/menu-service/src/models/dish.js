const { v4: uuidv4 } = require('uuid');

class Dish {
  constructor({ restaurantId, name, description, price, category, available = true, imageUrl = null, isPromo = false }) {
    this.id = uuidv4();
    this.restaurantId = restaurantId;
    this.name = name;
    this.description = description;
    this.price = price;
    this.category = category; // STARTER | MAIN | DESSERT | DRINK
    this.available = available;
    this.imageUrl = imageUrl;
    this.isPromo = isPromo;
    this.createdAt = new Date();
    this.restaurantVerified = true; // pour mode dégradé si restaurant-service down
  }
}

module.exports = Dish;