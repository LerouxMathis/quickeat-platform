const Dish = require('../models/dish');

class MenuService {
  constructor() {
    this.dishes = [];
  }

  addDish(dishData) {
    const dish = new Dish(dishData);
    this.dishes.push(dish);
    return dish;
  }

  updateDish(id, data) {
    const dish = this.dishes.find(d => d.id === id);
    if (!dish) return null;
    Object.assign(dish, data);
    return dish;
  }

  deleteDish(id) {
    const index = this.dishes.findIndex(d => d.id === id);
    if (index === -1) return false;
    this.dishes.splice(index, 1);
    return true;
  }

  getDish(id) {
    return this.dishes.find(d => d.id === id);
  }

  getDishesByRestaurant(restaurantId, filters = {}) {
    let list = this.dishes.filter(d => d.restaurantId === restaurantId);
    if (filters.category) list = list.filter(d => d.category === filters.category);
    if (filters.available !== undefined) list = list.filter(d => d.available === (filters.available === 'true'));
    return list;
  }

  pushPromo(dishData, restaurantIds) {
    const promos = [];
    restaurantIds.forEach(rid => {
      const dish = new Dish({ ...dishData, restaurantId: rid, isPromo: true });
      this.dishes.push(dish);
      promos.push(dish);
    });
    return promos;
  }
}

module.exports = new MenuService();