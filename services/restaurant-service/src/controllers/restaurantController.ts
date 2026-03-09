import { Request, Response } from "express";
import { restaurants } from "../data/restaurants";
import { v4 as uuid } from "uuid";
import { updateRestaurantMetrics } from "../metrics/prometheus";

export const getAllRestaurants = (req: Request, res: Response) => {
  res.json(restaurants);
  updateRestaurantMetrics();
};

export const getRestaurant = (req: Request, res: Response) => {
  const restaurant = restaurants.find(r => r.id === req.params.id);

  if (!restaurant) {
    return res.status(404).json({ message: "Restaurant not found" });
  }

  res.json(restaurant);
};

export const createRestaurant = (req: Request, res: Response) => {
  const newRestaurant = {
    id: uuid(),
    createdAt: new Date(),
    ...req.body
  };

  restaurants.push(newRestaurant);
  res.status(201).json(newRestaurant);
};

export const updateRestaurant = (req: Request, res: Response) => {
  const restaurant = restaurants.find(r => r.id === req.params.id);

  if (!restaurant) {
    return res.status(404).json({ message: "Restaurant not found" });
  }

  Object.assign(restaurant, req.body);
  res.json(restaurant);
};

export const getStats = (req: Request, res: Response) => {
  res.json({
    restaurantId: req.params.id,
    ordersToday: Math.floor(Math.random() * 200)
  });
};