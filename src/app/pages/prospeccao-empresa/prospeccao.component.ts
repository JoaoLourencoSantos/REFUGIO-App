import { OptionsService } from '../../services/options.service';
import { Component, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ValidadorUtil } from 'src/app/utils/validator.utils';

import { Empresa } from './../../models/entities/empresa.model';
import { CepService } from './../../services/cep.service';
import { EmpresaService } from './../../services/empresa.service';
import { ToastService } from './../../services/toast.service';

@Component({
	selector: 'app-prospeccao',
	templateUrl: './prospeccao.component.html',
	styleUrls: ['./prospeccao.component.scss'],
})
export class ProspeccaoEmpresaComponent implements OnInit {
	nome: string = '';
	email: string = '';

	userType = '';

	typeForm: FormGroup;
	pessoalForm: FormGroup;
	enderecoForm: FormGroup;
	contactForm: FormGroup;

	isEnderecoEditable = false;

	isEditable = false;

	cepValue = null;

	listAreasTrabalho: any[] = [];

	constructor(
		private toast: ToastService,
		private formBuilder: FormBuilder,
		private router: Router,
		private empresaService: EmpresaService,
		private cepService: CepService,
		private optionsService: OptionsService
	) {}

	ngOnInit(): void {
		this.setupForms();
		this.populateAreasTrabalho();
	}

	radioChange(event) {
		this.router.navigate(['/', 'prospeccao', 'colaborador']);
	}

	populateAreasTrabalho() {
		this.optionsService.findAreasTrabalho().subscribe((result) => {
			if (result) {
				this.listAreasTrabalho = result;
			}
		});
	}

	searchCEP(event) {
		this.cepValue = null;

		const cep = event.replace('-', '').replace('.', '');

		if (!this.cepValue && cep.length === 8) {
			this.cepService.findCep(cep).subscribe((result) => {
				if (result) {
					this.enderecoForm = this.formBuilder.group({
						cepEndereco: [result.cep],
						ruaEndereco: [result.logradouro],
						cidadeEndereco: [result.localidade],
						bairroEndereco: [result.bairro],
						estadoEndereco: [result.uf],
						numeroEndereco: [''],
						complementoEndereco: [''],
					});
				}
			});
		}
	}

	send() {
		const { type } = this.typeForm.value;
		this.userType = type;

		if (this.userType === 'EMPRESA') {
			const empresa: Empresa = {
				...this.pessoalForm.value,
				...this.contactForm.value,
			};

			empresa.endereco = {
				...this.enderecoForm.value,
			};

			empresa.areasTrabalho = empresa.areasTrabalho.map((element) =>
				Number(element)
			);

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
			type: ['EMPRESA', Validators.required],
		});

		this.pessoalForm = this.formBuilder.group({
			razaoSocial: ['', Validators.required],
			nomeFantasia: [''],
			cnpj: ['', Validators.required],
			dataFundacao: [''],
			numeroFuncionarios: [''],
			areasTrabalho: new FormControl(),
		});

		this.enderecoForm = this.formBuilder.group({
			cepEndereco: [''],
			ruaEndereco: new FormControl({
				value: '',
				disabled: !this.isEnderecoEditable,
			}),
			cidadeEndereco: new FormControl({
				value: '',
				disabled: !this.isEnderecoEditable,
			}),
			bairroEndereco: new FormControl({
				value: '',
				disabled: !this.isEnderecoEditable,
			}),
			estadoEndereco: new FormControl({
				value: '',
				disabled: !this.isEnderecoEditable,
			}),
			numeroEndereco: new FormControl({
				value: '',
				disabled: !this.isEnderecoEditable,
			}),
			complementoEndereco: new FormControl({
				value: '',
				disabled: !this.isEnderecoEditable,
			}),
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

	get enderecoControls() {
		return this.enderecoForm.controls;
	}
}
