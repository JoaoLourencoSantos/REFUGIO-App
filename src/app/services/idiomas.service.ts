import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import RespostaDTO from '../models/dto/resposta.dto';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class IdiomasService {
	private API_BASEPATH = environment.API_BASEPATH;

	constructor(private http: HttpClient) {}

	find(): Observable<any[]> {
		return this.http
			.get<RespostaDTO>(`${this.API_BASEPATH}/idiomas`, {
				headers: { 'Content-Type': 'application/json' },
			})
			.pipe(map((values) => values.corpo));
	}
}
