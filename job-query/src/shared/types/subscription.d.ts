export type Subscription = {
  id: number;
  name: string;
  price: string;
  is_annual: boolean;
  is_active: boolean;
  features?: string[];
};

export type UpdateSubscription = {
  subscription_id: number;
  is_annual: boolean;
};
