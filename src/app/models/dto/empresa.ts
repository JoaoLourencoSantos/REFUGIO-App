export default class ColaboradorDTO {
	public nomeEmpresa: string;
	public cnpj: string;
	public emailUsuario: string;
	public senhaUsuario: string;

	constructor(nome?: string, cnpj?: string, email?: string, senha?: string) {
		this.nomeEmpresa = nome;
		this.cnpj = cnpj;
		this.emailUsuario = email;
		this.senhaUsuario = senha;
	}
}
