import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import { TipoUsuario } from './models/enums/tipo-usuario';
import { ListColaboradorComponent } from './pages/colaborador/list-colaborador/list-colaborador.component';
import { ListEmpresaComponent } from './pages/empresa/list-empresa/list-empresa.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProspeccaoColaboradorComponent } from './pages/prospeccao-colaborador/prospeccao.component';
import { ProspeccaoEmpresaComponent } from './pages/prospeccao-empresa/prospeccao.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full',
	},
	{
		canActivate: [AuthGuard],
		path: 'home',
		component: HomeComponent,
	},
	{
		canActivate: [AuthGuard],
		data: { roles: [TipoUsuario.ADMIN] },
		path: 'colaborador/list',
		component: ListColaboradorComponent,
	},
	{
		path: 'prospeccao/colaborador',
		component: ProspeccaoColaboradorComponent,
	},
	{
		path: 'prospeccao/empresa',
		component: ProspeccaoEmpresaComponent,
	},
	{
		canActivate: [AuthGuard],
		data: { roles: [TipoUsuario.ADMIN] },
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
