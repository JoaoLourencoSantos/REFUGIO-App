import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditColaboradorComponent } from './pages/colaborador/edit-colaborador/edit-colaborador.component';
import { ListColaboradorComponent } from './pages/colaborador/list-colaborador/list-colaborador.component';
import { HomeComponent } from './pages/home/home.component';
import { ProspeccaoComponent } from './pages/prospeccao/prospeccao.component';
import { LoginComponent } from './pages/login/login.component';
import { EditEmpresaComponent } from './pages/empresa/edit-empresa/edit-empresa.component';
import { ListEmpresaComponent } from './pages/empresa/list-empresa/list-empresa.component';

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
	{
		path: 'prospeccao',
		component: ProspeccaoComponent,
	},
	{
		path: 'edit',
		component: EditColaboradorComponent,
	},
	{
		path: 'empresa/edit',
		component: EditEmpresaComponent,
	},
	{
		path: 'empresa/list',
		component: ListEmpresaComponent,
	},
	{
		path: 'login',
		component: LoginComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
