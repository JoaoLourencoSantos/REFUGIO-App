export class Colaborador {
	entrevistado: boolean;

	codigoUsuario: number;
	codigoColaborador: number;

	emailUsuario: string;
	senhaUsuario: string;
	tefoneUsuario: string;

	nomeColaborador: string;

	nacionalidade: string;
	escolaridade: string;
	areaFormacao: string;
	areasAtuacao: string;

	dataChegadaBrasil: Date;
	dataNascimento: Date;

	estado: string;
	cidade: string;
	rua: string;
	num: string;
	complemento: string;
	cep: string;

	idiomas: number[];

	dataCriacao: Date;
}
