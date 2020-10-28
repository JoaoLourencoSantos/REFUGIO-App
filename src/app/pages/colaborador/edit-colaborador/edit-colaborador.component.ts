import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CepService } from './../../../services/cep.service';
import { ColaboradorService } from './../../../services/colaborador.service';
import { ToastService } from './../../../services/toast.service';
import { ValidadorUtil } from 'src/app/utils/validator.utils';
import { Colaborador } from 'src/app/models/entities/colaborador.model';
import { IdiomasService } from 'src/app/services/idiomas.service';

@Component({
	selector: 'app-edit-colaborador',
	templateUrl: './edit-colaborador.component.html',
	styleUrls: ['./edit-colaborador.component.scss'],
})
export class EditColaboradorComponent implements OnInit {
	personalForm: FormGroup;
	adressForm: FormGroup;
	professionForm: FormGroup;
	contactForm: FormGroup;

	listIdiomas: any[] = [];
	selectedIdiomas: any[] = [];

	isUpdate = false;
	dialogData: Colaborador;

	actionClass = 'blue-action';

	constructor(
		private colaboradorService: ColaboradorService,
		private cepService: CepService,
		private idiomaService: IdiomasService,
		private dialogRef: MatDialogRef<EditColaboradorComponent>,
		private formBuilder: FormBuilder,
		private toast: ToastService,
		@Inject(MAT_DIALOG_DATA) dialogData
	) {
		if (dialogData !== null) {
			this.isUpdate = true;
			this.actionClass = 'orange-action';
			this.dialogData = dialogData.colaborador;
		}
	}

	ngOnInit(): void {
		this.setupForms();
	}

	setupForms() {
		this.personalForm = this.formBuilder.group({
			nomeColaborador: [
				this.isUpdate ? this.dialogData.nomeColaborador : '',
				Validators.required,
			],
			nacionalidade: [
				this.isUpdate ? this.dialogData.nacionalidade : '',
				Validators.required,
			],
			dataNascimento: [
				this.isUpdate ? this.dialogData.dataNascimento : '',
				Validators.required,
			],
			dataChegadaBrasil: [
				this.isUpdate ? this.dialogData.dataChegadaBrasil : '',
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

		this.professionForm = this.formBuilder.group({
			areaAtuacao: this.isUpdate ? this.dialogData.areasAtuacao : '',
			areaFormacao: this.isUpdate ? this.dialogData.areaFormacao : '',
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

	send() {
		const colaborador: Colaborador = {
			...this.personalForm.value,
			endereco: this.adressForm.value,
			...this.professionForm.value,
			...this.contactForm.value,
		};

		if (colaborador.idiomas) {
			colaborador.idiomas = colaborador.idiomas.map((element) =>
				Number(element)
			);
		}

		if (this.isUpdate) {
			this.colaboradorService
				.updateUser(
					{
						EmailUsuario:
							colaborador.emailUsuario ===
							this.dialogData.emailUsuario
								? null
								: colaborador.emailUsuario,
						SenhaUsuario: colaborador.senhaUsuario,
						Entrevistado: colaborador.entrevistado,
						TelefoneUsuario: colaborador.telefoneUsuario,
					},
					this.dialogData.codigoUsuario
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

						this.colaboradorService
							.update(colaborador, this.dialogData.codigoUsuario)
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
			this.colaboradorService.createEmployee(colaborador).subscribe(
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

	populateIdiomas() {
		this.idiomaService.find().subscribe((result) => {
			if (result) {
				this.listIdiomas = result;
			}
		});
	}

	get personalControls() {
		return this.personalForm.controls;
	}

	get adressControls() {
		return this.adressForm.controls;
	}

	get professionControls() {
		return this.professionForm.controls;
	}

	get contactControls() {
		return this.contactForm.controls;
	}

	closeWindow() {
		this.dialogRef.close();
	}
}
