import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'productos',
    loadChildren: () =>
      import('./pages/productos/productos.module').then(
        (m) => m.ProductosModule
      ),
  },
  {
    path: 'usuario',
    loadChildren: () =>
      import('./pages/usuario/usuario.module').then((m) => m.UsuarioModule),
  },
  {
    path: 'pedidos',
    loadChildren: () =>
      import('./pages/pedidos/pedidos.module').then((m) => m.PedidosModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
