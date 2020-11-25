import { EmpresaDetailsComponent } from './../details/empresa-details/empresa-details.component';
import { ColaboradorDetailsComponent } from './../details/colaborador-details/colaborador-details.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import PesquisaEmpresaDTO from 'src/app/models/dto/pesquisa.empresa.dto';

import { Empresa } from './../../../models/entities/empresa.model';
import { EmpresaService } from './../../../services/empresa.service';
import { OptionsService } from './../../../services/options.service';

@Component({
	selector: 'app-home-colaborador',
	templateUrl: './home-colaborador.component.html',
	styleUrls: ['./home-colaborador.component.scss'],
})
export class HomeColaboradorComponent implements OnInit {
	listAreasTrabalho: any[] = [];
	listEmpresas: Empresa[] = [];

	public nomeFantasia: string;
	public cidade: string;
	public codigoAreaTrabalho: string;

	constructor(
		private optionsService: OptionsService,
		private empresaService: EmpresaService,
		public dialog: MatDialog
	) {}

	ngOnInit(): void {
		this.populateAreasTrabalho();
		this.populateEmpresas();
	}

	populateAreasTrabalho() {
		this.optionsService.findAreasTrabalho().subscribe((result) => {
			if (result) {
				this.listAreasTrabalho = result;
			}
		});
	}

	populateEmpresas() {
		this.empresaService
			.find(
				new PesquisaEmpresaDTO(
					this.nomeFantasia,
					this.cidade,
					this.codigoAreaTrabalho
				)
			)
			.subscribe((result) => {
				if (result.sucesso) {
					this.listEmpresas = result.corpo;
				}
			});
	}

	openDetails(empresa: any) {
		const dialogConfig = new MatDialogConfig();

		dialogConfig.data = { empresa };

		const dialogRef = this.dialog.open(
			EmpresaDetailsComponent,
			dialogConfig
		);
	}
}
