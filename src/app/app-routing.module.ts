import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  { path: 'mi-cuenta', loadChildren: () => import('./pages/my-account/my-account.module').then(m => m.MyAccountModule) },
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
