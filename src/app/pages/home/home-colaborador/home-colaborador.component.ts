import { Component, OnInit } from '@angular/core';

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

	constructor(
		private optionsService: OptionsService,
		private empresaService: EmpresaService
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
		this.empresaService.find().subscribe((result) => {
			if (result.sucesso) {
				this.listEmpresas = result.corpo;
			}
		});
	}
}
