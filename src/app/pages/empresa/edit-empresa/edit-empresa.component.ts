import { Component, OnInit, Inject } from '@angular/core';
import { ToastService } from './../../../services/toast.service';
import { EmpresaService } from './../../../services/empresa.service';
import EmpresaDTO from 'src/app/models/dto/empresa';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StringUtils } from 'src/app/utils/string.utils';

@Component({
	selector: 'app-edit-empresa',
	templateUrl: './edit-empresa.component.html',
	styleUrls: ['./edit-empresa.component.scss'],
})
export class EditEmpresaComponent implements OnInit {
	razaoSocial: string;
	emailContato: string;
	senha: string;
	isUpdate: boolean;
	idUsuario: number;
	oldEmail: string;
	actionClass: string = 'blue-action';

	constructor(
		private empresaService: EmpresaService,
		private dialogRef: MatDialogRef<EditEmpresaComponent>,
		private toast: ToastService,
		@Inject(MAT_DIALOG_DATA) dialogData
	) {
		if (dialogData !== null) {
			this.isUpdate = true;
			this.razaoSocial = dialogData.empresa.razaoSocial;
			this.emailContato = dialogData.empresa.emailContato;
			this.oldEmail = dialogData.empresa.emailContato;
			this.idUsuario = dialogData.empresa.codigoUsuario;
			this.senha = null;
			this.actionClass = 'orange-action';
		}
	}

	ngOnInit(): void {}

	send(): void {
		if (!this.razaoSocial || !this.emailContato) {
			this.toast.infoErroAlert();
			return;
		}

		if (!StringUtils.isEmailValid(this.emailContato)) {
			this.toast.errorAlertWithMessage('Email inválido!');
			return;
		}

		if (StringUtils.hasSpace(this.emailContato)) {
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
		this.empresaService
			.update(new EmpresaDTO(this.razaoSocial), this.idUsuario)
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
		this.empresaService
			.updateUser(
				{
					EmailUsuario:
						this.emailContato === this.oldEmail
							? null
							: this.emailContato.trim(),
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

		this.empresaService
			.create(
				new EmpresaDTO(
					this.razaoSocial,
					this.emailContato.trim(),
					this.senha
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
		return this.emailContato !== this.oldEmail || this.senha;
	}

	closeWindow() {
		this.dialogRef.close();
	}
}
