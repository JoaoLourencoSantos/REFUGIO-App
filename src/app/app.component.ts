import { UsuarioService } from './services/usuario.service';
import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	constructor(private service: UsuarioService) {}

	isAuthenticated(): boolean {
		return this.service.isAuthenticated();
	}
}
