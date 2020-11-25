import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import RespostaDTO from '../models/dto/resposta.dto';

@Injectable({
	providedIn: 'root',
})
export class UsuarioService {
	private API_BASEPATH = environment.API_BASEPATH;

	// 1= usuário colaborador
	// 2= usuário empresa

	constructor(private http: HttpClient, private router: Router) {}

	auth = async (email, senha) => {
		let result: any = { sucess: true, error: null };
		await this.sendPost(email, senha)
			.toPromise()
			.then((response) => {
				console.log(response);

				if (!response.sucesso) {
					result.sucess = false;
					result.error = response.mensagem;
				} else {
					this.setSessao(response.corpo);
				}
			})
			.catch((err) => {
				result.sucess = false;
				result.error = 'Erro no servidor';
			});

		return result;
	};

	sendPost(email, password): Observable<RespostaDTO> {
		return this.http.post<RespostaDTO>(
			`${this.API_BASEPATH}/usuarios/autenticacao`,
			{
				EmailUsuario: email,
				SenhaUsuario: password,
			},
			{ headers: { 'Content-Type': 'application/json' } }
		);
	}

	updateStatus(status: boolean, idUsuario: any): Observable<RespostaDTO> {
		return this.http.patch<RespostaDTO>(
			`${this.API_BASEPATH}/usuarios/${idUsuario}`,
			{
				Entrevistado: status,
			},
			{ headers: { 'Content-Type': 'application/json' } }
		);
	}

	deleteUser(userId: any): Observable<RespostaDTO> {
		return this.http.delete<RespostaDTO>(
			`${this.API_BASEPATH}/usuarios/${userId}`,
			{ headers: { 'Content-Type': 'application/json' } }
		);
	}

	setSessao(identificador: any): void {
		localStorage.setItem('user-logged', JSON.stringify(identificador));
	}

	removeSessao(): void {
		localStorage.removeItem('user-logged');

		this.router.navigate(['login']).then(() => {
			window.location.reload();
		});
	}

	isAuthenticated(): boolean {
		if (localStorage.getItem('user-logged')) return true;

		return false;
	}

	getSessao(): any {
		return JSON.parse(localStorage.getItem('user-logged'));
	}

	getRole(): any {
		return this.getSessao() ? this.getSessao().perfilUsuario : null;
	}

	isAdmin(): boolean {
		return !this.getRole();
	}

	isEmployee(): boolean {
		return this.getRole() !== null && this.getRole() === 1;
	}

	isCompany(): boolean {
		return this.getRole() !== null && this.getRole() === 2;
	}
}
