import { IOrder } from 'app/shared/model/sales/order.model';

export interface IOrderItem {
  id?: number;
  description?: string;
  quantity?: number;
  pricePerItem?: number;
  totalPrice?: number;
  order?: IOrder | null;
}

export const defaultValue: Readonly<IOrderItem> = {};
