import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import ResponseDTO from '../models/dto/response.dto';
import { Usuario } from '../models/entities/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private API_BASEPATH = environment.API_BASEPATH;

  constructor(private http: HttpClient, private cookie: CookieService) {}

  auth = async (email, senha) => {
    let sucess = true;
    await this.sendPost(email, senha)
      .toPromise()
      .then((response) => {
        this.setSessao(response.body.user);
      })
      .catch((err) => {
        sucess = false;
      });

    return sucess;
  };

  sendPost(email, password): Observable<ResponseDTO> {
    return this.http.post<ResponseDTO>(
      `${this.API_BASEPATH}/usuario/autenticacao`,
      {
        email,
        password,
      }
    );
  }

  setSessao(usuario: Usuario): void {
    this.cookie.set('_my_cookie_', JSON.stringify(usuario));
    localStorage.setItem('user-logged', JSON.stringify(usuario));
  }
}
