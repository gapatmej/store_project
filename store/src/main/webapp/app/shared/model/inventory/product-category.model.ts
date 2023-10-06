import { IProduct } from 'app/shared/model/inventory/product.model';
import { ICategory } from 'app/shared/model/inventory/category.model';

export interface IProductCategory {
  id?: number;
  product?: IProduct | null;
  category?: ICategory | null;
}

export const defaultValue: Readonly<IProductCategory> = {};
