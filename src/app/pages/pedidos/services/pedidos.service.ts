import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pedido } from 'src/app/shared/models/interfaces/pedidos.interface';

@Injectable({
  providedIn: 'root',
})
export class PedidosService {
  public pedidos: Observable<Pedido[]>;
  private pedidosColeccion: AngularFirestoreCollection<Pedido>;

  constructor(private readonly afs: AngularFirestore) {
    this.pedidosColeccion = this.afs.collection<Pedido>('pedidos');
    this.pedidos = this.obtenerPedido();
  }

  eliminarPedido(pedidoId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const resultado = this.pedidosColeccion.doc(pedidoId).delete();
        resolve(resultado);
      } catch (error) {
        reject(error.message);
      }
    });
  }

  guardarPedido(pedido: Pedido): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = pedido.id;
        const resultado = this.pedidosColeccion.doc(id).set(pedido);
        resolve(resultado);
      } catch (error) {
        reject(error.message);
      }
    });
  }

  private obtenerPedido(): Observable<Pedido[]> {
    return this.pedidosColeccion
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((resultado) => resultado.payload.doc.data() as Pedido)
        )
      );
  }
}
