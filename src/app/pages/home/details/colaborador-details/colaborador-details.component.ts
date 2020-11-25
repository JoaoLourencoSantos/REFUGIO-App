import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
	selector: 'app-colaborador-details',
	templateUrl: './colaborador-details.component.html',
	styleUrls: ['./colaborador-details.component.scss'],
})
export class ColaboradorDetailsComponent implements OnInit {
	colaborador: any = null;

	constructor(@Inject(MAT_DIALOG_DATA) dialogData) {
		if (dialogData !== null) {
			this.colaborador = dialogData.colaborador;
		}
	}

	ngOnInit(): void {}

	getAreas(areas) {
		return areas.map((element) => element.descricaoAreaTrabalho);
	}

	getIdiomas(idiomas) {
		return idiomas.map((element) => element.descricaoIdioma);
	}
}
