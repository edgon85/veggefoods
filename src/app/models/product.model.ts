export class ProductoModel {
  constructor(
    public _id: string,
    public nombre: string,
    public detalle: string,
    public categoria: string,
    public descuento: number,
    public destacado: boolean,
    public imagen: string,
    public precio: number,
    public masa: string,
    public comentaio?: string,
    public madurez?: string,
    public opciones?: {
      comentario: false,
      madurez: false
    }
  ) {}
}
