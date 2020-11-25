import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
	providedIn: 'root',
})
export class ToastService {
	constructor(private _snackBar: MatSnackBar) {}

	errorAlert() {
		this.openSnackBar('Opss... erro ao executar esta ação!', 'snack-error');
	}

	errorAuth(motivo: string) {
		this.openSnackBar(
			`Opss... não foi possivel realizar login! Motivo : ${motivo}`,
			'snack-error'
		);
	}

	errorAlertWithMessage(motivo: string) {
		this.openSnackBar(
			`Opss... não foi possivel realizar operação! Motivo : ${motivo}`,
			'snack-error'
		);
	}

	infoErroAlert() {
		this.openSnackBar(
			'Opss... preencha corretamente as informações!',
			'snack-error'
		);
	}
	successAlert() {
		this.openSnackBar(
			'A operação foi executada com sucesso!',
			'snack-success'
		);
	}

	openSnackBar(message: string, style: string) {
		this._snackBar.open(message, '', {
			duration: 5000,
			horizontalPosition: 'end',
			verticalPosition: 'top',
			panelClass: style,
		});
	}
}
