import { ProductoModel } from '../models/product.model';
export interface CartInterface {
  cartItemId: string;
  quantity: number;
  product: ProductoModel;
}
