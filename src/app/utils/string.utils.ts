export abstract class StringUtils {
	static isEmailValid(email: string) {
		const regex = /\S+@\S+\.\S+/;

		return regex.test(email);
	}

	static hasSpace(value: string) {
		if (value.includes(' ')) return true;

		return false;
	}
}
