import { ProductoModel } from '../models/product.model';

export interface OrderInterface {
  $key: string;
  condiciones: boolean;
  correo: string;
  direccion: Direccion;
  fechaCreacion: string;
  fechaEntrega: string;
  nombre: string;
  productos: ProductoModel[];
  status: string;
  telefono: string;
  tipoPago: string;
  totales: Totales;
}

export interface Direccion {
  departamento: string;
  municipio: string;
  referencia: string;
  ubicacion: string;
  zona: string;
}

export interface Totales {
  delivery: number;
  discount: number;
  subtotal: number;
  total: number;
}
