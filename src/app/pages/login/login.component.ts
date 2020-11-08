import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToastService } from './../../services/toast.service';
import { UsuarioService } from './../../services/usuario.service';

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

		const result = await this.service.auth(this.email.trim(), this.senha.trim());

		if (!result.sucess) {
			this.toast.errorAuth(result.error);
			return;
		}

		this.router.navigate(this.redirectUrl);
	};

	get redirectUrl() {

		if (this.service.isCompany()) return ['/',  'home', 'empresa'];
		if (this.service.isEmployee()) return ['/',  'home', 'colaborador'];

		return  ['/',  'colaborador', 'list'];
	}
}
