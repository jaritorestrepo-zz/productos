import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import Estados from 'src/app/shared/models/consts/estados';
import Mensajes from 'src/app/shared/models/consts/mensajes';
import TipoMensajes from 'src/app/shared/models/consts/tipo-mensajes';
import { Alerta } from 'src/app/shared/models/interfaces/alertas.interface';
import { Pedido } from 'src/app/shared/models/interfaces/pedidos.interface';
import { PedidosService } from '../../services/pedidos.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss'],
})
export class ListarComponent implements OnInit {
  public pedidos: Pedido[] = [];
  public navigationExtras: NavigationExtras = {
    state: { value: null },
  };

  public estadoPendiente = Estados.PENDIENTE;

  constructor(
    private router: Router,
    private pedidosService: PedidosService,
    private nzMessageService: NzMessageService
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    const cargando = this.nzMessageService.loading('Cargando...', {
      nzDuration: 0,
    }).messageId;
    this.pedidosService.pedidos.subscribe({
      next: (resultado) => {
        this.nzMessageService.remove(cargando);
        this.pedidos = resultado;
      },
      error: () => {
        this.nzMessageService.remove(cargando);
        this.nzMessageService.create(TipoMensajes.ERROR, Mensajes.ERROR, {
          nzDuration: 5000,
        });
        this.pedidos = [];
      },
    });
  }

  completar(pedido: Pedido): void {
    pedido.estado = Estados.COMPLETADO;
    const cargando = this.nzMessageService.loading('Cargando...', {
      nzDuration: 0,
    }).messageId;
    let mensaje: Alerta;
    this.pedidosService
      .guardarPedido(pedido)
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
      });
  }

  editar(pedido: Pedido): void {
    this.navigationExtras.state = { value: pedido };
    this.router.navigate(['pedidos/editar'], this.navigationExtras);
  }

  async eliminar(pedidoId: string): Promise<void> {
    const cargando = this.nzMessageService.loading('Cargando...', {
      nzDuration: 0,
    }).messageId;
    try {
      await this.pedidosService.eliminarPedido(pedidoId);
      this.nzMessageService.remove(cargando);
    } catch (error) {
      this.nzMessageService.remove(cargando);
      this.nzMessageService.create(TipoMensajes.ERROR, Mensajes.ERROR, {
        nzDuration: 5000,
      });
    }
  }
}
