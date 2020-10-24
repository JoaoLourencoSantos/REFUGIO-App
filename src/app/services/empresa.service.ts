import { Empresa } from './../models/entities/empresa.model';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Usuario } from '../models/entities/usuario.model';
import EmpresaDTO from '../models/dto/empresa';
import RespostaDTO from '../models/dto/resposta.dto';

@Injectable({
	providedIn: 'root',
})
export class EmpresaService {
	private API_BASEPATH = environment.API_BASEPATH;

	constructor(private http: HttpClient) {}

	create(body: EmpresaDTO): Observable<RespostaDTO> {
		return this.http.post<RespostaDTO>(
			`${this.API_BASEPATH}/usuarios/empresa`,
			body,
			{ headers: { 'Content-Type': 'application/json' } }
		);
	}

	createCompany(body: Empresa): Observable<RespostaDTO> {
		return this.http.post<RespostaDTO>(
			`${this.API_BASEPATH}/usuarios/empresa`,
			body,
			{ headers: { 'Content-Type': 'application/json' } }
		);
	}

	update(body: EmpresaDTO, idUsuario): Observable<any> {
		return this.http.patch<any>(
			`${this.API_BASEPATH}/empresas/${idUsuario}`,
			body,
			{ headers: { 'Content-Type': 'application/json' } }
		);
	}

	updateUser(body: any, idUsuario): Observable<any> {
		return this.http.patch<any>(
			`${this.API_BASEPATH}/usuarios/${idUsuario}`,
			body,
			{ headers: { 'Content-Type': 'application/json' } }
		);
	}

	find(): Observable<RespostaDTO> {
		return this.http.get<RespostaDTO>(`${this.API_BASEPATH}/empresas`, {
			headers: { 'Content-Type': 'application/json' },
		});
	}
}
