export interface MedusaRegionMetadata {
  is_food_in_cart_required: boolean;
  legal_age: number;
  food_in_cart_limit: number;
}

export enum MedusaProductTabs {
  White = "White",
  Red = "Red",
  Rose = "Rose",
  Spirits = "Spirits",
}

export enum MedusaProductTypeNames {
  Wine = "Wine",
  MenuItem = "MenuItem",
  MarketItem = "MarketItem",
  RequiredFood = "RequiredFood",
}
