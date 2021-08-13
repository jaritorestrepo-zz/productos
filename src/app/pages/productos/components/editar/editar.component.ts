import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ProductosService } from 'src/app/pages/productos/services/productos.service';
import Mensajes from 'src/app/shared/models/consts/mensajes';
import TipoMensajes from 'src/app/shared/models/consts/tipo-mensajes';
import { Alerta } from 'src/app/shared/models/interfaces/alertas.interface';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss'],
})
export class EditarComponent {
  public producto;
  public productoForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private productosService: ProductosService,
    private nzMessageService: NzMessageService
  ) {
    const navegador = this.router.getCurrentNavigation();
    this.producto = navegador?.extras?.state?.value;
    this.productoForm = this.iniciarForm();
    if (!this.producto) {
      this.router.navigate(['/productos/crear']);
    } else {
      this.definirValores();
    }
  }

  guardar(): void {
    if (this.productoForm.valid) {
      const cargando = this.nzMessageService.loading('Cargando...', {
        nzDuration: 0,
      }).messageId;
      const producto = this.productoForm.value;
      const productoId = this.producto?.id || null;
      let mensaje: Alerta;
      this.productosService
        .guardarProducto(producto, productoId)
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
          this.lista();
        });

      this.productoForm.reset();
    }
  }

  lista(): void {
    this.router.navigate(['productos']);
  }

  private iniciarForm(): FormGroup {
    return this.fb.group({
      nombre: ['', Validators.required],
      sku: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  private definirValores(): void {
    const nombre = this.productoForm.get('nombre');
    const sku = this.productoForm.get('sku');
    const descripcion = this.productoForm.get('descripcion');

    nombre?.setValue(this.producto.nombre);
    sku?.setValue(this.producto.sku);
    descripcion?.setValue(this.producto.descripcion);
  }
}
