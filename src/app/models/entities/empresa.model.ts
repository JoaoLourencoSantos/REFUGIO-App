import { Endereco } from './endereco.model';

export class Empresa {
	entrevistado: boolean;

	codigoUsuario: number;
	codigoEmpresa: number;

	emailUsuario: string;
	senhaUsuario: string;
	telefoneUsuario: string;

	cnpj: string;

	razaoSocial: string;
	nomeFantasia: string;
	numeroFuncionarios: number;

	areasTrabalho: any[];

	endereco: Endereco;

	dataFundacao: Date;
	dataCriacao: Date;
}
