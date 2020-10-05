import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { UsuarioService } from './../services/usuario.service';

@Injectable({
	providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
	constructor(
		private usuarioService: UsuarioService,
		public router: Router
	) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		const expectedRoles: [any] = route.data.roles;

		if (!this.usuarioService.isAuthenticated()) {
			this.router.navigate(['login']);
			return false;
		}

		if (
			expectedRoles &&
			expectedRoles.length > 0 &&
			!expectedRoles.includes(this.usuarioService.getRole())
		) {
			this.router.navigate(['home']);
			return false;
		}

		return true;
	}
}
