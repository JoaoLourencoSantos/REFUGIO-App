import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import ColaboradorDTO from 'src/app/models/dto/colaborador';
import { StringUtils } from 'src/app/utils/string.utils';

import { ColaboradorService } from './../../../services/colaborador.service';
import { ToastService } from './../../../services/toast.service';

@Component({
	selector: 'app-edit-colaborador',
	templateUrl: './edit-colaborador.component.html',
	styleUrls: ['./edit-colaborador.component.scss'],
})
export class EditColaboradorComponent implements OnInit {
	nome: string;
	email: string;
	senha: string;

	isUpdate: boolean;
	idUsuario: number;

	oldEmail: string;

	actionClass: string = 'blue-action';

	constructor(
		private colaboradorService: ColaboradorService,
		private dialogRef: MatDialogRef<EditColaboradorComponent>,
		private toast: ToastService,
		@Inject(MAT_DIALOG_DATA) dialogData
	) {
		if (dialogData !== null) {
			this.isUpdate = true;
			this.nome = dialogData.colaborador.nomeColaborador;
			this.email = dialogData.colaborador.emailUsuario;
			this.oldEmail = dialogData.colaborador.emailUsuario;
			this.idUsuario = dialogData.colaborador.codigoUsuario;
			this.senha = null;

			this.actionClass = 'orange-action';
		}
	}

	ngOnInit(): void {}

	send(): void {
		if (!this.nome || !this.email) {
			this.toast.infoErroAlert();
			return;
		}

		if (!StringUtils.isEmailValid(this.email)) {
			this.toast.errorAlertWithMessage('Email inválido!');
			return;
		}

		if (StringUtils.hasSpace(this.email)) {
			this.toast.errorAlertWithMessage(
				'O email não deve conter espaços!'
			);
			return;
		}

		if (!this.isUpdate) {
			this.save();
			return;
		}

		if (this.isUpdateUser()) {
			this.updateUser();
			return;
		}

		this.update();
		return;
	}

	update() {
		this.colaboradorService
			.update(new ColaboradorDTO(this.nome), this.idUsuario)
			.subscribe(
				(result) => {
					if (!result) {
						return;
					}

					if (!result.sucesso) {
						this.toast.errorAlertWithMessage(result.mensagem);
						return;
					}

					this.closeWindow();

					this.toast.successAlert();
				},
				(err) => {
					if (err) {
						this.toast.errorAlertWithMessage(err.error.mensagem);
					}
				}
			);
	}

	updateUser() {
		this.colaboradorService
			.updateUser(
				{
					EmailUsuario:
						this.email === this.oldEmail ? null : this.email.trim(),
					SenhaUsuario: this.senha ? this.senha.trim() : this.senha,
				},
				this.idUsuario
			)
			.subscribe(
				(result) => {
					if (!result) {
						return;
					}

					if (!result.sucesso) {
						this.toast.errorAlertWithMessage(result.mensagem);
						return;
					}

					//update colaborador
					this.update();

					this.closeWindow();
				},
				(err) => {
					if (err) {
						this.toast.errorAlertWithMessage(err.error.mensagem);
					}
				}
			);
	}

	save() {
		if (!this.senha) {
			this.toast.infoErroAlert();
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
					if (!result) {
						return;
					}

					console.log(result);

					if (!result.sucesso) {
						this.toast.errorAlertWithMessage(result.mensagem);
						return;
					}

					this.closeWindow();
					this.toast.successAlert();
				},
				(err) => {
					if (err) {
						this.toast.errorAlertWithMessage(err.error.mensagem);
					}
				}
			);
	}

	isUpdateUser() {
		return this.email !== this.oldEmail || this.senha;
	}

	closeWindow() {
		this.dialogRef.close();
	}
}
