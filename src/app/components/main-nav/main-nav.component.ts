import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { UsuarioService } from './../../services/usuario.service';

@Component({
	selector: 'app-main-nav',
	templateUrl: './main-nav.component.html',
	styleUrls: ['./main-nav.component.scss'],
})
export class MainNavComponent implements OnInit {
	isHandset$: Observable<boolean> = this.breakpointObserver
		.observe(Breakpoints.Handset)
		.pipe(
			map((result) => result.matches),
			shareReplay()
		);

	constructor(
		public breakpointObserver: BreakpointObserver,
		public router: Router,
		public dialog: MatDialog,
		public service: UsuarioService
	) {}

	ngOnInit(): void {}

	logout() {
		this.service.removeSessao();
	}
	get homeLink() {
		if (this.service.isCompany()) return 'home/empresa';
		if (this.service.isEmployee()) return 'home/colaborador';

		if (this.service.isAdmin()) return 'colaborador/list';
	}


	isAdmin(): boolean {
		return this.service.isAdmin();
	}

	isAuthenticated(): boolean {
		return this.service.isAuthenticated();
	}
}
