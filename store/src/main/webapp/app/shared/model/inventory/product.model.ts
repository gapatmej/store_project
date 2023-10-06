export interface IProduct {
  id?: number;
  name?: string;
  description?: string | null;
  stock?: number;
  price?: number;
  imageContentType?: string | null;
  image?: string | null;
}

export const defaultValue: Readonly<IProduct> = {};
