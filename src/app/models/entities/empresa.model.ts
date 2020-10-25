import { Endereco } from './endereco.model';

export class Empresa {
	entrevistado: boolean;

	codigoUsuario: number;
	codigoEmpresa: number;

	emailUsuario: String;
	senhaUsuario: string;
	tefoneUsuario: string;

	cnpj:String;

	emailContato: string;
	razaoSocial: string;
	nomeFantasia:string;
	numeroFuncionarios:number;

	areasTrabalho: number[];

	endereco: Endereco;

	dataFundacao:Date;
	dataCriacao: Date;
}
