import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import { TipoUsuario } from './models/enums/tipo-usuario';
import { ListColaboradorComponent } from './pages/colaborador/list-colaborador/list-colaborador.component';
import { ListEmpresaComponent } from './pages/empresa/list-empresa/list-empresa.component';
import { HomeColaboradorComponent } from './pages/home/home-colaborador/home-colaborador.component';
import { HomeEmpresaComponent } from './pages/home/home-empresa/home-empresa.component';
import { LoginComponent } from './pages/login/login.component';
import { ProspeccaoColaboradorComponent } from './pages/prospeccao-colaborador/prospeccao.component';
import { ProspeccaoEmpresaComponent } from './pages/prospeccao-empresa/prospeccao.component';
import { PerfilColaboradorComponent } from './pages/colaborador/perfil-colaborador/perfil-colaborador.component';
import { PerfilEmpresaComponent } from './pages/empresa/perfil-empresa/perfil-empresa.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full',
	},
	{
		canActivate: [AuthGuard],
		path: 'home/empresa',
		component: HomeEmpresaComponent,
	},
	{
		canActivate: [AuthGuard],
		path: 'home/colaborador',
		component: HomeColaboradorComponent,
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
		canActivate: [AuthGuard],
		path: 'colaborador/profile',
		component: PerfilColaboradorComponent,
	},
	{
		canActivate: [AuthGuard],
		path: 'empresa/profile',
		component: PerfilEmpresaComponent,
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
