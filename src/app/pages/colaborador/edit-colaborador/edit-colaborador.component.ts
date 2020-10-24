import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColaboradorService } from './../../../services/colaborador.service';
import { ToastService } from './../../../services/toast.service';
import { ValidadorUtil } from 'src/app/utils/validator.utils';
import { Colaborador } from 'src/app/models/entities/colaborador.model';

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

	isUpdate = false;
	dialogData: Colaborador;

	actionClass = 'blue-action';

	constructor(
		private colaboradorService: ColaboradorService,
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
			estado: [
				this.isUpdate ? this.dialogData.estado : '',
				Validators.required,
			],
			cidade: [
				this.isUpdate ? this.dialogData.cidade : '',
				Validators.required,
			],
			rua: [
				this.isUpdate ? this.dialogData.rua : '',
				Validators.required,
			],
			num: [
				this.isUpdate ? this.dialogData.num : '',
				Validators.required,
			],
			complemento: [
				this.isUpdate ? this.dialogData.complemento : '',
				Validators.required,
			],
			cep: [
				this.isUpdate ? this.dialogData.cep : '',
				Validators.required,
			],
		});

		this.professionForm = this.formBuilder.group({
			areasAtuacao: this.isUpdate
				? this.dialogData.areasAtuacao
				: new FormArray([]),
			areaFormacao: this.isUpdate
				? this.dialogData.areaFormacao
				: new FormArray([]),
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
		});
	}

	send() {
		const colaborador: Colaborador = {
			...this.personalForm.value,
			...this.adressForm.value,
			...this.professionForm.value,
			...this.contactForm.value,
		};

		if (this.isUpdate) {
			this.colaboradorService
				.update(colaborador, this.dialogData.codigoUsuario)
				.subscribe(
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

	closeWindow() {
		this.dialogRef.close();
	}
}
