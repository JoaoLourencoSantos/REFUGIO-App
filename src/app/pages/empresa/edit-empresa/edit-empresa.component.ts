import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Empresa } from 'src/app/models/entities/empresa.model';
import { CepService } from 'src/app/services/cep.service';
import { ValidadorUtil } from 'src/app/utils/validator.utils';

import { EmpresaService } from './../../../services/empresa.service';
import { ToastService } from './../../../services/toast.service';

@Component({
	selector: 'app-edit-empresa',
	templateUrl: './edit-empresa.component.html',
	styleUrls: ['./edit-empresa.component.scss'],
})
export class EditEmpresaComponent implements OnInit {
	personalForm: FormGroup;
	adressForm: FormGroup;
	contactForm: FormGroup;

	isUpdate = false;
	actionClass = 'blue-action';
	dialogData: Empresa;

	constructor(
		private empresaService: EmpresaService,
		private cepService: CepService,
		private dialogRef: MatDialogRef<EditEmpresaComponent>,
		private formBuilder: FormBuilder,
		private toast: ToastService,
		@Inject(MAT_DIALOG_DATA) dialogData
	) {
		if (dialogData !== null) {
			this.isUpdate = true;
			this.actionClass = 'orange-action';
			this.dialogData = dialogData.empresa;
		}
	}

	ngOnInit(): void {
		this.setupForms();
	}

	setupForms() {
		this.personalForm = this.formBuilder.group({
			razaoSocial: [
				this.isUpdate ? this.dialogData.razaoSocial : '',
				Validators.required,
			],
			nomeFantasia: [
				this.isUpdate ? this.dialogData.nomeFantasia : '',
				Validators.required,
			],
			dataFundacao: [
				this.isUpdate ? this.dialogData.dataFundacao : '',
				Validators.required,
			],
			numeroFuncionarios: [
				this.isUpdate ? this.dialogData.numeroFuncionarios : '',
				Validators.required,
			],
			cnpj: [
				this.isUpdate ? this.dialogData.cnpj : '',
				Validators.required,
			],
		});

		this.adressForm = this.formBuilder.group({
			estadoEndereco: [
				this.isUpdate && this.dialogData.endereco
					? this.dialogData.endereco.estadoEndereco
					: '',
				Validators.required,
			],
			cidadeEndereco: [
				this.isUpdate && this.dialogData.endereco
					? this.dialogData.endereco.cidadeEndereco
					: '',
				Validators.required,
			],
			bairroEndereco: [
				this.isUpdate && this.dialogData.endereco
					? this.dialogData.endereco.bairroEndereco
					: '',
				Validators.required,
			],
			ruaEndereco: [
				this.isUpdate && this.dialogData.endereco
					? this.dialogData.endereco.ruaEndereco
					: '',
				Validators.required,
			],
			numeroEndereco: [
				this.isUpdate && this.dialogData.endereco
					? this.dialogData.endereco.numeroEndereco
					: '',
				Validators.required,
			],
			cepEndereco: [
				this.isUpdate && this.dialogData.endereco
					? this.dialogData.endereco.cepEndereco
					: '',
				Validators.required,
			],
		});

		this.contactForm = this.formBuilder.group({
			emailUsuario: [
				this.isUpdate ? this.dialogData.emailUsuario : '',
				[
					Validators.required,
					Validators.pattern(
						'^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'
					),
				],
			],
			senhaUsuario: [
				'',
				Validators.compose([
					Validators.required,
					Validators.minLength(6),
					ValidadorUtil.validatePassword(),
				]),
			],
			telefoneUsuario: [
				this.isUpdate ? this.dialogData.telefoneUsuario : '',
			],
			entrevistado: [this.isUpdate ? this.dialogData.entrevistado : ''],
		});
	}

	send(): void {
		const empresa: Empresa = {
			...this.personalForm.value,
			endereco: this.adressForm.value,
			...this.contactForm.value,
		};

		if (this.isUpdate) {
			this.empresaService
				.updateUser(
					{
						EmailUsuario:
							empresa.emailUsuario ===
							this.dialogData.emailUsuario
								? null
								: empresa.emailUsuario,
						SenhaUsuario: empresa.senhaUsuario,
						Entrevistado: empresa.entrevistado,
						TelefoneUsuario: empresa.telefoneUsuario,
					},
					this.dialogData.codigoEmpresa
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

						this.empresaService
							.update(empresa, this.dialogData.codigoUsuario)
							.subscribe(
								(result) => {
									if (!result) {
										return;
									}

									if (!result.sucesso) {
										this.toast.errorAlertWithMessage(
											result.mensagem
										);
										return;
									}
									this.toast.successAlert();
									this.closeWindow();
								},
								(err) => {
									if (err) {
										this.toast.errorAlertWithMessage(
											err.error.mensagem
										);
									}
								}
							);

						this.closeWindow();
					},
					(err) => {
						if (err) {
							this.toast.errorAlertWithMessage(
								err.error.mensagem
							);
						}
					}
				);
		} else {
			this.empresaService.createCompany(empresa).subscribe(
				(result) => {
					if (!result) {
						return;
					}

					if (!result.sucesso) {
						this.toast.errorAlertWithMessage(result.mensagem);
						return;
					}
					this.toast.successAlert();
					this.closeWindow();
				},
				(err) => {
					if (err) {
						this.toast.errorAlertWithMessage(err.error.mensagem);
					}
				}
			);
		}
	}

	searchCEP(event) {
		const cep = event.replace('-', '').replace('.', '');

		if (cep.length === 8) {
			this.cepService.findCep(cep).subscribe((result) => {
				if (result) {
					this.adressForm = this.formBuilder.group({
						cepEndereco: [result.cep],
						ruaEndereco: [result.logradouro],
						cidadeEndereco: [result.localidade],
						bairroEndereco: [result.bairro],
						estadoEndereco: [result.uf],
						numeroEndereco: [''],
					});
				}
			});
		}
	}

	get personalControls() {
		return this.personalForm.controls;
	}

	get adressControls() {
		return this.adressForm.controls;
	}

	get contactControls() {
		return this.contactForm.controls;
	}

	closeWindow() {
		this.dialogRef.close();
	}
}
