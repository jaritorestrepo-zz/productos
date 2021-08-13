import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavigationExtras, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import Estados from 'src/app/shared/models/consts/estados';
import Mensajes from 'src/app/shared/models/consts/mensajes';
import TipoMensajes from 'src/app/shared/models/consts/tipo-mensajes';
import { Alerta } from 'src/app/shared/models/interfaces/alertas.interface';
import { Pedido } from 'src/app/shared/models/interfaces/pedidos.interface';
import { PedidosService } from '../../services/pedidos.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss'],
})
export class EditarComponent implements OnInit {
  public pedido;
  public navigationExtras: NavigationExtras = {
    state: { value: null },
  };

  constructor(
    private router: Router,
    private nzMessageService: NzMessageService,
    private pedidosService: PedidosService,
    private readonly afs: AngularFirestore
  ) {
    const navegador = this.router.getCurrentNavigation();
    this.pedido = navegador?.extras?.state?.value;
  }

  ngOnInit(): void {}

  agregar() {
    if (this.pedido) {
      this.irLista(this.pedido);
    } else {
      const cargando = this.nzMessageService.loading('Cargando...', {
        nzDuration: 0,
      }).messageId;
      const pedido: Pedido = {
        id: this.afs.createId(),
        estado: Estados.PENDIENTE,
        productos: [],
      };
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
          this.irLista(pedido);
        });
    }
  }

  irLista(pedido: Pedido): void {
    this.navigationExtras.state = { value: pedido };
    this.router.navigate(['productos'], this.navigationExtras);
  }
}
