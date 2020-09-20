import { ToastService } from './../../../services/toast.service';
import { ColaboradorService } from './../../../services/colaborador.service';
import { Component, OnInit } from '@angular/core';
import ColaboradorDTO from 'src/app/models/dto/colaborador';
import { MatDialogRef } from '@angular/material/dialog';
import { StringUtils } from 'src/app/utils/string.utils';

@Component({
	selector: 'app-edit-colaborador',
	templateUrl: './edit-colaborador.component.html',
	styleUrls: ['./edit-colaborador.component.scss'],
})
export class EditColaboradorComponent implements OnInit {
	nome: string;
	email: string;
	senha: string;

	constructor(
		private colaboradorService: ColaboradorService,
		private dialogRef: MatDialogRef<EditColaboradorComponent>,
		private toast: ToastService
	) {}

	ngOnInit(): void {}

	send(): void {
		if (!this.nome || !this.email || !this.senha) {
			this.toast.infoErroAlert();
			return;
		}

		if (!StringUtils.isEmailValid(this.email)) {
			this.toast.errorAlertWithMessage('Email inválido!');
			return;
		}

		if (this.senha.length < 6) {
			this.toast.errorAlertWithMessage(
				'A senha deve ter mais de 6 caracteres!'
			);
			return;
		}

		if (StringUtils.hasSpace(this.senha)) {
			this.toast.errorAlertWithMessage(
				'A senha não deve conter espaços!'
			);
			return;
		}

		if (StringUtils.hasSpace(this.email)) {
			this.toast.errorAlertWithMessage(
				'O email não deve conter espaços!'
			);
			return;
		}

		this.closeWindow();

		this.colaboradorService
			.create(
				new ColaboradorDTO(
					this.nome,
					this.email.trim(),
					this.senha.trim()
				)
			)
			.subscribe(
				(result) => {
					console.log(result);
					if (!result) {
						return;
					}

					if (Number(result.codigoUsuarioCadastrado) === 0) {
						this.toast.errorAlertWithMessage(result.mensagem);
						return;
					}

					this.toast.successAlert();
				},
				(err) => {
					if (err) {
						this.toast.errorAlertWithMessage(err.error.mensagem);
					}
				}
			);
	}

	closeWindow() {
		this.dialogRef.close();
	}
}
