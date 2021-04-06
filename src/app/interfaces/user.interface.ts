import { Timestamp } from 'rxjs/internal/operators/timestamp';

export class UsuarioModel {
  email: string;
  password: string;
  nombre: string;
  uid?: string;
  telefono?: string;
  direccion?: string;
  timestamp?: string;
  edad?: string;
}