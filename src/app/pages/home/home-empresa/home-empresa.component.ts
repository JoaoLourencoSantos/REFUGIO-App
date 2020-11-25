import { ColaboradorDetailsComponent } from './../details/colaborador-details/colaborador-details.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import PesquisaColaboradorDTO from 'src/app/models/dto/pesquisa.colaborador.dto';
import { Colaborador } from 'src/app/models/entities/colaborador.model';

import { ColaboradorService } from './../../../services/colaborador.service';
import { OptionsService } from './../../../services/options.service';

@Component({
  selector: 'app-home-empresa',
  templateUrl: './home-empresa.component.html',
  styleUrls: ['./home-empresa.component.scss']
})
export class HomeEmpresaComponent implements OnInit {

	listColaboradores: Colaborador[] = [];
	listIdiomas: any[] = [];
	listAreasTrabalho: any[] = [];

	public nomeColaborador: string;
	public nacionalidade: string;
	public cidade: string;
	public codigoIdioma: string;
	public codigoAreaTrabalho: string;


	constructor(
		private colaboradorService: ColaboradorService,
		private optionsService: OptionsService,

		public dialog: MatDialog
	) {}

	ngOnInit(): void {
		this.populateIdiomas();
		this.populateAreasTrabalho();
		this.populateColaboradores();
	}

	populateIdiomas() {
		this.optionsService.findIdiomas().subscribe((result) => {
			if (result) {
				this.listIdiomas = result;
			}
		});
	}

	populateAreasTrabalho() {
		this.optionsService.findAreasTrabalho().subscribe((result) => {
			if (result) {
				this.listAreasTrabalho = result;
			}
		});
	}

	populateColaboradores() {
		this.colaboradorService
			.find(new PesquisaColaboradorDTO(
				this.nacionalidade,
				this.cidade,
				this.codigoIdioma,
				this.codigoAreaTrabalho
			))
			.subscribe((result) => {
				if (result.sucesso) {
					this.listColaboradores = result.corpo;
				}
			});
	}

	openDetails(colaborador) {
		const dialogConfig = new MatDialogConfig();


		dialogConfig.data = { colaborador };

		const dialogRef = this.dialog.open(
			ColaboradorDetailsComponent,
			dialogConfig
		);
	}
}
