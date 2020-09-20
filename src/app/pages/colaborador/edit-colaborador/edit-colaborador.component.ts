import { ToastService } from './../../../services/toast.service';
import { ColaboradorService } from './../../../services/colaborador.service';
import { Component, Inject, OnInit } from '@angular/core';
import ColaboradorDTO from 'src/app/models/dto/colaborador';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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

	isUpdate: boolean;
	idUsuario: number;

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
			this.email = dialogData.colaborador.emailContato;
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

		this.closeWindow();

		if (this.isUpdate) {
			this.update();
			return;
		}

		this.save();
	}

	update() {
		this.colaboradorService
			.update(
				new ColaboradorDTO(this.nome, this.email.trim()),
				this.idUsuario
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
