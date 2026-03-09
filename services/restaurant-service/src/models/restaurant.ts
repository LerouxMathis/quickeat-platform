export type RestaurantStatus =
  | "OPEN"
  | "CLOSED"
  | "RENOVATION";

export interface Restaurant {
  id: string;
  name: string;
  address: string;
  managerId: string;
  phone: string;
  openingHours: Record<string, string>;
  status: RestaurantStatus;
  createdAt: Date;
}