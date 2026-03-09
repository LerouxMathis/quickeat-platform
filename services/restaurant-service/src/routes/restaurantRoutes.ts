import { Router } from "express";
import * as controller from "../controllers/restaurantController";

const router = Router();

router.get("/restaurants", controller.getAllRestaurants);
router.get("/restaurants/:id", controller.getRestaurant);
router.post("/restaurants", controller.createRestaurant);
router.put("/restaurants/:id", controller.updateRestaurant);
router.get("/restaurants/:id/stats", controller.getStats);

export default router;