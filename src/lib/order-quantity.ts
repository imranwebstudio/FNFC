/** Max meals per single order line */
export const MAX_ORDER_QUANTITY = 20;

export const orderQuantitySchema = {
  min: 1,
  max: MAX_ORDER_QUANTITY,
} as const;
