import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListColaboradorComponent } from './pages/colaborador/list-colaborador/list-colaborador.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'colaborador/list',
    component: ListColaboradorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
