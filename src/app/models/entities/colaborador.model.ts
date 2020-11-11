import { Endereco } from './endereco.model';

export class Colaborador {
	entrevistado: boolean;

	codigoUsuario: number;
	codigoColaborador: number;

	emailUsuario: string;
	senhaUsuario: string;
	telefoneUsuario: string;

	nomeColaborador: string;

	nacionalidade: string;
	escolaridade: string;
	areaFormacao: string;
	areasAtuacao: string[];

	dataChegadaBrasil: Date;
	dataNascimento: Date;

	endereco: Endereco;

	idiomas: any[];
	areasTrabalho: any[];

	dataCriacao: Date;
}
