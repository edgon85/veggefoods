import { CartInterface } from './cart.interface';
export class Checkout {
  correo: string;
  nombre: string;
  telefono: string;
  departamento: string;
  municipio: string;
  zona: string;
  direccion: string;
  referencia: string;
  totales: object;
  productos: CartInterface[];
  fechaCreacion: string;
  fechaEnvio: string;
  $key?: string;
}

export enum Departamento {
  Quetzaltenango = 'QUE'
}

export enum Municipio {
  Quetzaltenango = 'Quetzaltenango',
  La_Esperanza = 'La esperanza',
  Salcaja = 'Salcaja',
  Olintepeque = 'Olintepeque'
}

export enum Zona {
  Zona1 = 'Zona 1',
  Zona2 = 'Zona 2',
  Zona3 = 'Zona 3',
  Zona4 = 'Zona 4',
  Zona5 = 'Zona 5',
  Zona6 = 'Zona 6',
  Zona7 = 'Zona 7',
  Zona8 = 'Zona 8',
  Zona9 = 'Zona 9',
  Zona10 = 'Zona 10',
  Zona11 = 'Zona 11'
}
