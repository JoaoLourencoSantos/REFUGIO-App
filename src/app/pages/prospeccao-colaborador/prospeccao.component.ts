import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidadorUtil } from 'src/app/utils/validator.utils';

import { Colaborador } from './../../models/entities/colaborador.model';
import { ColaboradorService } from './../../services/colaborador.service';
import { ToastService } from './../../services/toast.service';

@Component({
	selector: 'app-prospeccao',
	templateUrl: './prospeccao.component.html',
	styleUrls: ['./prospeccao.component.scss'],
})
export class ProspeccaoColaboradorComponent implements OnInit {
	nome: string = '';
	email: string = '';

	userType = '';

	typeForm: FormGroup;
	pessoalForm: FormGroup;
	terceiroForm: FormGroup;
	contactForm: FormGroup;

	isEditable = false;
	constructor(
		private toast: ToastService,
		private formBuilder: FormBuilder,
		private router: Router,
		private colaboradorService: ColaboradorService
	) {}

	ngOnInit(): void {
		this.setupForms();
	}

	radioChange(event) {
		console.log(event);

		this.router.navigate(['/','prospeccao', 'empresa'])
	}

	send() {
		const { type } = this.typeForm.value;
		this.userType = type;

		if (this.userType === 'EMPRESA') {
			console.log('empresa');
		}

		if (this.userType === 'COLABORADOR') {
			const colaborador: Colaborador = {
				...this.pessoalForm.value,
				...this.terceiroForm.value,
				...this.contactForm.value,
			};

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

					this.router.navigate(['/', 'login']);
				},
				(err) => {
					if (err) {
						this.toast.errorAlertWithMessage(err.error.mensagem);
					}
				}
			);
		}
	}

	setupForms() {
		this.typeForm = this.formBuilder.group({
			type: ['COLABORADOR', Validators.required],
		});

		this.pessoalForm = this.formBuilder.group({
			nomeColaborador: ['', ],
			nacionalidade: ['', ],
			dataNascimento: ['', ],
			dataChegadaBrasil: ['', ],
		});

		this.terceiroForm = this.formBuilder.group({
			areasAtuacao: new FormArray([]),
			areasFormacao: new FormArray([]),
		});

		this.contactForm = this.formBuilder.group({
			emailUsuario: [
				'',
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
			telefone: [''],
		});
	}

	get isEmpresa(): boolean {
		return this.userType === 'EMPRESA';
	}

	get typeControls() {
		return this.typeForm.controls;
	}

	get pessoalControls() {
		return this.pessoalForm.controls;
	}

	get contactControls() {
		return this.contactForm.controls;
	}
}
