import { ToastService } from './../../services/toast.service';
import { Router } from '@angular/router';
import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	email: string = '';
	senha: string = '';

	constructor(
		private service: UsuarioService,
		private router: Router,
		private toast: ToastService
	) {}

	ngOnInit(): void {}

	login = async () => {
		if (!this.email || !this.senha) {
			this.toast.infoErroAlert();
			return;
		}

		const result = await this.service.auth(this.email, this.senha);

		if (!result.sucess) {
			this.toast.errorAuth(result.error);
			return;
		}

		this.router.navigate(['/', 'home']);
	};
}
