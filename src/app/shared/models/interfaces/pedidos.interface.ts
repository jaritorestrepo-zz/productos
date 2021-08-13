import { Producto } from './productos.interface';

export interface Pedido {
  id: string;
  estado: 'pending' | 'completed';
  productos: Productos[];
}

interface Productos extends Producto {
  cantidad: number;
}
