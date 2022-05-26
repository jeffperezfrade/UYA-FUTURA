import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'manual', loadChildren: () => import('./pages/manual/manual.module').then(m => m.ManualModule) },
  { path: 'sobre-nosotros', loadChildren: () => import('./pages/about-us/about-us.module').then(m => m.AboutUsModule) },
  { path: 'carrito', loadChildren: () => import('./pages/shopping-cart/shopping-cart.module').then(m => m.ShoppingCartModule) },
  { path: 'mi-cuenta', loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule) },
  { path: 'registrarse', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule) },
  { path: 'iniciar-sesion', loadChildren: () => import('./pages/sign-in/sign-in.module').then(m => m.SignInModule) },
  { path: '', loadChildren: () => import('./pages/main-page/main-page.module').then(m => m.MainPageModule) },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top', // Hace scroll hasta el principio de la pagina cada vez q se cambia de url
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
