export type PaymentMethod = {
  id?: number;
  cardType: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  isActive: boolean;
};

export type CreatePaymentMethodForm = {
  cardType: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  isActive: boolean;
};

export type UpdatePaymentMethodForm = {
  id: number;
  cardType: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  isActive: boolean;
};

export type CreatePaymentMethodFormErrors = {
  cardType: boolean | string | undefined;
  cardNumber: boolean | string | undefined;
  expirationDate: boolean | string | undefined;
  cvv: boolean | string | undefined;
  isActive: boolean | string | undefined;
};

export type UpdatePaymentMethodFormErrors = {
  cardType: boolean | string | undefined;
  cardNumber: boolean | string | undefined;
  expirationDate: boolean | string | undefined;
  cvv: boolean | string | undefined;
};
