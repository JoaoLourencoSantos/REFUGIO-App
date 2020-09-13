import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Usuario } from '../models/entities/usuario.model';

import RespostaLoginDTO from '../models/dto/resposta.login.dto';

@Injectable({
	providedIn: 'root',
})
export class UsuarioService {
	private API_BASEPATH = environment.API_BASEPATH;

	//1= usuário colaborador
	//2= usuário empresa

	constructor(private http: HttpClient, private router: Router) {}

	auth = async (email, senha) => {
		let result: any = { sucess: true, error: null };
		await this.sendPost(email, senha)
			.toPromise()
			.then((response) => {
				console.log(response);

				if (!response.sucessoAutenticacao) {
					result.sucess = false;
					result.error = response.motivo;
				} else {
					this.setSessao(response.codigoUsuario);
				}
			})
			.catch((err) => {
				console.log(err);
				result.sucess = false;
				result.error = 'Erro no servidor';
			});

		return result;
	};

	sendPost(email, password): Observable<RespostaLoginDTO> {
		return this.http.post<RespostaLoginDTO>(
			`${this.API_BASEPATH}/usuarios/autenticacao`,
			{
				EmailUsuario: email,
				SenhaUsuario: password,
			},
			{ headers: { 'Content-Type': 'application/json' } }
		);
	}

	setSessao(identificador: any): void {
		localStorage.setItem('user-logged', JSON.stringify(identificador));
	}

	removeSessao(): void {
		localStorage.removeItem('user-logged');
		this.router.navigate(['login']);
	}

	hasSessao(): boolean {
		if (localStorage.getItem('user-logged')) return true;

		return false;
	}
}
