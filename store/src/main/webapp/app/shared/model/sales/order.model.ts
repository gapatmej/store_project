import dayjs from 'dayjs';
import { IOrderItem } from 'app/shared/model/sales/order-item.model';
import { OrderStatus } from 'app/shared/model/enumerations/order-status.model';

export interface IOrder {
  id?: number;
  customerName?: string;
  customerId?: number;
  placedDate?: string;
  status?: OrderStatus;
  code?: string;
  orderItems?: IOrderItem[] | null;
}

export const defaultValue: Readonly<IOrder> = {};
