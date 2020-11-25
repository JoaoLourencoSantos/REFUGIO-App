import { EditEmpresaComponent } from './../edit-empresa/edit-empresa.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EmpresaService } from 'src/app/services/empresa.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Empresa } from 'src/app/models/entities/empresa.model';

@Component({
	selector: 'app-perfil-empresa',
	templateUrl: './perfil-empresa.component.html',
	styleUrls: ['./perfil-empresa.component.scss'],
})
export class PerfilEmpresaComponent implements OnInit {
	empresa: Empresa = {} as Empresa;

	constructor(
		public dialog: MatDialog,
		private empresaService: EmpresaService,
		private userService: UsuarioService
	) {
		this.loadProfile();
	}

	ngOnInit(): void {}

	loadProfile(): void {
		const colaboradorSessao = this.userService.getSessao();
		this.empresaService
			.findById(colaboradorSessao.codigoUsuario)
			.subscribe((result) => {
				if (result.sucesso) {
					this.empresa = result.corpo;
				}
			});
	}

	editProfile() {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.data = { empresa: this.empresa };
		this.dialog.open(EditEmpresaComponent, dialogConfig);
	}
}
