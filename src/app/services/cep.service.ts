import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class CepService {
	constructor(private http: HttpClient) {}

	findCep(cep: string): Observable<any> {
		return this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`, {
			headers: { 'Content-Type': 'application/json' },
		});
	}
}
