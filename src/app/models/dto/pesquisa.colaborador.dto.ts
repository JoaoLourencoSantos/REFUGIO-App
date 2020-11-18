export default class PesquisaColaboradorDTO {
	public nacionalidade: string;
	public cidade: string;
	public codigoIdioma: string;
	public codigoAreaTrabalho: string;

	constructor(
		nacionalidade: string,
		cidade: string,
		codigoIdioma: string,
		codigoAreaTrabalho: string
	) {
		this.nacionalidade = nacionalidade;
		this.cidade = cidade;
		this.codigoIdioma = codigoIdioma;
		this.codigoAreaTrabalho = codigoAreaTrabalho;
	}

	public buildUrl(): string {
		let criteria = '';

		if (this.nacionalidade) {
			criteria +=
				this.getSeparator(criteria) +
				'nacionalidade=' +
				this.nacionalidade;
		}

		if (this.cidade) {
			criteria += this.getSeparator(criteria) + 'cidade=' + this.cidade;
		}

		if (this.codigoIdioma) {
			criteria += this.getSeparator(criteria) + 'codigoidioma=' + this.codigoIdioma;
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
		if (criteria.length === 0) {
			return '';
		}

		return '&';
	}
}
