export default class ColaboradorDTO {
	public nomeColaborador: string;
	public emailUsuario: string;
	public senhaUsuario: string;

	constructor(nome?: string, email?: string, senha?: string) {
		this.nomeColaborador = nome;
		this.emailUsuario = email;
		this.senhaUsuario = senha;
	}
}
