import { Component, OnInit } from '@angular/core';
import {
	FormArray,
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ValidadorUtil } from 'src/app/utils/validator.utils';

import { Colaborador } from './../../models/entities/colaborador.model';
import { ColaboradorService } from './../../services/colaborador.service';
import { OptionsService } from '../../services/options.service';
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

	listIdiomas: any[] = [];
	listAreasTrabalho: any[] = [];

	selectedIdiomas: any[] = [];

	typeForm: FormGroup;
	pessoalForm: FormGroup;
	terceiroForm: FormGroup;
	contactForm: FormGroup;

	isEditable = false;
	constructor(
		private toast: ToastService,
		private formBuilder: FormBuilder,
		private router: Router,
		private colaboradorService: ColaboradorService,
		private optionsService: OptionsService
	) {}

	ngOnInit(): void {
		this.setupForms();
		this.populateIdiomas();
		this.populateAreasTrabalho();
	}

	radioChange(event) {
		console.log(event);

		this.router.navigate(['/', 'prospeccao', 'empresa']);
	}

	populateIdiomas() {
		this.optionsService.findIdiomas().subscribe((result) => {
			if (result) {
				this.listIdiomas = result;
			}
		});
	}

	populateAreasTrabalho() {
		this.optionsService.findAreasTrabalho().subscribe((result) => {
			if (result) {
				this.listAreasTrabalho = result;
			}
		});
	}

	send() {
		const { type } = this.typeForm.value;
		this.userType = type;

		if (this.userType === 'COLABORADOR') {
			const colaborador: Colaborador = {
				...this.pessoalForm.value,
				...this.terceiroForm.value,
				...this.contactForm.value,
			};

			colaborador.idiomas = colaborador.idiomas.map((element) =>
				Number(element)
			);

			colaborador.areasTrabalho = colaborador.areasTrabalho.map(
				(element) => Number(element)
			);

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
			nomeColaborador: ['', Validators.required],
			nacionalidade: ['', Validators.required],
			dataNascimento: [''],
			dataChegadaBrasil: ['', Validators.required],
		});

		this.terceiroForm = this.formBuilder.group({
			areasTrabalho: new FormControl(),
			areaFormacao: [''],
			idiomas: new FormControl(),
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
			tefoneUsuario: [''],
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
