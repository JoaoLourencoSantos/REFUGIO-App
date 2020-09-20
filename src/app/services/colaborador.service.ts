import { Colaborador } from './../models/entities/colaborador.model';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Usuario } from '../models/entities/usuario.model';

import RespostaLoginDTO from '../models/dto/resposta.login.dto';
import ColaboradorDTO from '../models/dto/colaborador';

@Injectable({
	providedIn: 'root',
})
export class ColaboradorService {
	private API_BASEPATH = environment.API_BASEPATH;

	constructor(private http: HttpClient) {}

	create(body: ColaboradorDTO): Observable<any> {
		return this.http.post<any>(
			`${this.API_BASEPATH}/usuarios/colaborador`,
			body,
			{ headers: { 'Content-Type': 'application/json' } }
		);
	}

	find(): Observable<Colaborador[]> {
		return this.http.get<Colaborador[]>(
			`${this.API_BASEPATH}/colaboradores`,
			{ headers: { 'Content-Type': 'application/json' } }
		);
	}
}
