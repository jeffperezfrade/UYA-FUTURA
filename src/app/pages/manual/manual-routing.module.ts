import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManualComponent } from './manual.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: ManualComponent},
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManualRoutingModule { }
