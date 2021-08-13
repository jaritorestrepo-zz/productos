import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarComponent } from './components/listar/listar.component';
import { EditarComponent } from './components/editar/editar.component';

const routes: Routes = [
  {
    path: '',
    component: ListarComponent,
  },
  {
    path: 'crear',
    component: EditarComponent,
  },
  {
    path: 'editar',
    component: EditarComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductosRoutingModule {}
