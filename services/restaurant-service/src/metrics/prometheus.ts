import client from "prom-client";
import { restaurants } from "../data/restaurants";

export const register = new client.Registry();

client.collectDefaultMetrics({ register });

export const httpRequests = new client.Counter({
  name: "http_requests_total",
  help: "Total HTTP requests",
  labelNames: ["method", "route", "status_code"]
});

export const httpDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "HTTP request duration",
  labelNames: ["method", "route", "status_code"]
});

export const restaurantsTotal = new client.Gauge({
  name: "restaurants_total",
  help: "Total restaurants"
});

export const restaurantsOpen = new client.Gauge({
  name: "restaurants_open_total",
  help: "Open restaurants"
});

register.registerMetric(httpRequests);
register.registerMetric(httpDuration);
register.registerMetric(restaurantsTotal);
register.registerMetric(restaurantsOpen);

export const updateRestaurantMetrics = () => {

  restaurantsTotal.set(restaurants.length);

  const open = restaurants.filter(r => r.status === "OPEN").length;

  restaurantsOpen.set(open);

};