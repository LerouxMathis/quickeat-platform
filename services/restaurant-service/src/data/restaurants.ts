import { v4 as uuid } from "uuid";
import { Restaurant } from "../models/restaurant";

export const restaurants: Restaurant[] = [
  {
    id: uuid(),
    name: "QuickEat Paris Bastille",
    address: "12 rue de la Roquette, 75011 Paris",
    managerId: "manager-paris",
    phone: "0102030405",
    openingHours: { monday: "11:00-22:00" },
    status: "OPEN",
    createdAt: new Date()
  },
  {
    id: uuid(),
    name: "QuickEat Lyon Part-Dieu",
    address: "Centre Commercial Part-Dieu",
    managerId: "manager-lyon",
    phone: "0203040506",
    openingHours: { monday: "11:00-22:00" },
    status: "OPEN",
    createdAt: new Date()
  },
  {
    id: uuid(),
    name: "QuickEat Marseille Vieux-Port",
    address: "Vieux-Port Marseille",
    managerId: "manager-marseille",
    phone: "0304050607",
    openingHours: { monday: "11:00-22:00" },
    status: "RENOVATION",
    createdAt: new Date()
  }
];