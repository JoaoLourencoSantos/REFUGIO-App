export default class PesquisaEmpresaDTO {
	public nomeFantasia: string;
	public cidade: string;
	public codigoAreaTrabalho: string;

	constructor(
		nomeFantasia: string,
		cidade: string,
		codigoAreaTrabalho: string
	) {
		this.nomeFantasia = nomeFantasia;
		this.cidade = cidade;
		this.codigoAreaTrabalho = codigoAreaTrabalho;
	}

	public buildUrl(): string {
		let criteria: string = '';

		if (this.nomeFantasia) {
			criteria +=
				this.getSeparator(criteria) +
				'nomeFantasia=' +
				this.nomeFantasia;
		}

		if (this.cidade) {
			criteria += this.getSeparator(criteria) + 'cidade=' + this.cidade;
		}

		if (this.codigoAreaTrabalho) {
			criteria +=
				this.getSeparator(criteria) +
				'codigoAreaTrabalho=' +
				this.codigoAreaTrabalho;
		}

		return criteria;
	}

	getSeparator(criteria: string) {
		if (criteria.length === 0) return '';

		return '&';
	}
}
