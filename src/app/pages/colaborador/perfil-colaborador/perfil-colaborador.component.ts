import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { EditColaboradorComponent } from '../edit-colaborador/edit-colaborador.component';
import { Colaborador } from './../../../models/entities/colaborador.model';
import { ColaboradorService } from './../../../services/colaborador.service';
import { UsuarioService } from './../../../services/usuario.service';

@Component({
	selector: 'app-perfil-colaborador',
	templateUrl: './perfil-colaborador.component.html',
	styleUrls: ['./perfil-colaborador.component.scss'],
})
export class PerfilColaboradorComponent implements OnInit {
	colaborador: Colaborador = {} as Colaborador;

	constructor(
		public dialog: MatDialog,
		private colaboradorService: ColaboradorService,
		private userService: UsuarioService
	) {
		this.loadProfile();
	}

	ngOnInit(): void {}

	loadProfile(): void {
		const colaboradorSessao = this.userService.getSessao();
		this.colaboradorService
			.findById(colaboradorSessao.codigoUsuario)
			.subscribe((result) => {
				if (result.sucesso) {
					this.colaborador = result.corpo;
				}
			});
	}

	editProfile() {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.data = { colaborador: this.colaborador };
		this.dialog.open(EditColaboradorComponent, dialogConfig);
	}
}
