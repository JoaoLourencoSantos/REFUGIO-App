export default class EmpresaDTO {
	public razaoSocial: string;
	public emailUsuario: string;
	public senhaUsuario: string;

	constructor(razaoSocial?: string, email?: string, senha?: string) {
		this.razaoSocial = razaoSocial;
		this.emailUsuario = email;
		this.senhaUsuario = senha;
	}
}
