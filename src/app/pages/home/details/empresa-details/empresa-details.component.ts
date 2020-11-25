import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'app-empresa-details',
	templateUrl: './empresa-details.component.html',
	styleUrls: ['./empresa-details.component.scss'],
})
export class EmpresaDetailsComponent implements OnInit {
	empresa: any = null;

	constructor(@Inject(MAT_DIALOG_DATA) dialogData) {
		if (dialogData !== null) {
			this.empresa = dialogData.empresa;
		}
	}

	ngOnInit(): void {}

	getAreas(areas) {
		return areas.map((element) => element.descricaoAreaTrabalho);
	}
}
