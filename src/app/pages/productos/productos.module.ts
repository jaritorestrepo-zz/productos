import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroModule } from 'src/app/ngzorro.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditarComponent } from './components/editar/editar.component';
import { ListarComponent } from './components/listar/listar.component';
import { ProductosRoutingModule } from './productos-routing.module';

@NgModule({
  declarations: [ListarComponent, EditarComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgZorroModule,
    ProductosRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductosModule {}
