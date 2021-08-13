import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { PedidosService } from 'src/app/pages/pedidos/services/pedidos.service';
import Mensajes from 'src/app/shared/models/consts/mensajes';
import TipoMensajes from 'src/app/shared/models/consts/tipo-mensajes';
import { Alerta } from 'src/app/shared/models/interfaces/alertas.interface';
import { Pedido } from 'src/app/shared/models/interfaces/pedidos.interface';
import { Producto } from 'src/app/shared/models/interfaces/productos.interface';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss'],
})
export class ListarComponent implements OnInit {
  public productos: Producto[] = [];
  public navigationExtras: NavigationExtras = {
    state: { value: null },
  };
  public pedido: Pedido;

  constructor(
    private router: Router,
    private productosService: ProductosService,
    private pedidosService: PedidosService,
    private nzMessageService: NzMessageService
  ) {
    const navegador = this.router.getCurrentNavigation();
    this.pedido = navegador?.extras?.state?.value;
  }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    const cargando = this.nzMessageService.loading('Cargando...', {
      nzDuration: 0,
    }).messageId;
    this.productosService.productos.subscribe({
      next: (resultado) => {
        this.nzMessageService.remove(cargando);
        this.productos = resultado;
      },
      error: () => {
        this.nzMessageService.remove(cargando);
        this.nzMessageService.create(TipoMensajes.ERROR, Mensajes.ERROR, {
          nzDuration: 5000,
        });
        this.productos = [];
      },
    });
  }

  pedir(producto: Producto): void {
    const cargando = this.nzMessageService.loading('Cargando...', {
      nzDuration: 0,
    }).messageId;
    this.pedido.productos.push({ cantidad: 1, ...producto });
    let mensaje: Alerta;
    this.pedidosService
      .guardarPedido(this.pedido)
      .then(() => {
        mensaje = {
          tipo: TipoMensajes.EXITOSO,
          mensaje: Mensajes.EXITOSO,
        };
      })
      .catch(() => {
        mensaje = { tipo: TipoMensajes.ERROR, mensaje: Mensajes.ERROR };
      })
      .finally(() => {
        this.nzMessageService.remove(cargando);
        this.nzMessageService.create(mensaje.tipo, mensaje.mensaje, {
          nzDuration: 5000,
        });
        this.navigationExtras.state = { value: this.pedido };
        this.router.navigate(['pedidos/editar'], this.navigationExtras);
      });
  }

  editar(producto: Producto): void {
    this.navigationExtras.state = { value: producto };
    this.router.navigate(['productos/editar'], this.navigationExtras);
  }

  async eliminar(productoId: string): Promise<void> {
    const cargando = this.nzMessageService.loading('Cargando...', {
      nzDuration: 0,
    }).messageId;
    try {
      await this.productosService.eliminarProducto(productoId);
      this.nzMessageService.remove(cargando);
    } catch (error) {
      this.nzMessageService.remove(cargando);
      this.nzMessageService.create(TipoMensajes.ERROR, Mensajes.ERROR, {
        nzDuration: 5000,
      });
    }
  }
}
