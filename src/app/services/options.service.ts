import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Injectable } from '@angular/core';
import RespostaDTO from '../models/dto/resposta.dto';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class OptionsService {
	private API_BASEPATH = environment.API_BASEPATH;

	constructor(private http: HttpClient) {}

	findIdiomas(): Observable<any[]> {
		return this.http
			.get<RespostaDTO>(`${this.API_BASEPATH}/idiomas`, {
				headers: { 'Content-Type': 'application/json' },
			})
			.pipe(map((values) => values.corpo));
	}

	findAreasTrabalho(): Observable<any[]> {
		return this.http
			.get<RespostaDTO>(`${this.API_BASEPATH}/areas-trabalho`, {
				headers: { 'Content-Type': 'application/json' },
			})
			.pipe(map((values) => values.corpo));
	}
}
