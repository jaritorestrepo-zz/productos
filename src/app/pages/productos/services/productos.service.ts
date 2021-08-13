import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Producto } from 'src/app/shared/models/interfaces/productos.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  public productos: Observable<Producto[]>;
  private productosColeccion: AngularFirestoreCollection<Producto>;

  constructor(private readonly afs: AngularFirestore) {
    this.productosColeccion = afs.collection<Producto>('productos');
    this.productos = this.obtenerProducto();
  }

  eliminarProducto(productoId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const resultado = this.productosColeccion.doc(productoId).delete();
        resolve(resultado);
      } catch (error) {
        reject(error.message);
      }
    });
  }

  guardarProducto(producto: Producto, productoId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = productoId || this.afs.createId();
        const data = { id, ...producto };
        const resultado = this.productosColeccion.doc(id).set(data);
        resolve(resultado);
      } catch (error) {
        reject(error.message);
      }
    });
  }

  private obtenerProducto(): Observable<Producto[]> {
    return this.productosColeccion
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((resultado) => resultado.payload.doc.data() as Producto)
        )
      );
  }
}
