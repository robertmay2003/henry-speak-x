const gen = require('random-seed');

let RandomHelper = class RandomHelper {

	static generator = new gen(0);

	constructor(string) {
		// the string represents the full string passed to the translator
		this.string = string
	}

	value(word) {
		// the word represents the current word of the string being processed

		// num is the sum of all ascii codes for each character in the string and word
		let num = 0;
		for (let char of this.string + word) {
			num += char.charCodeAt(0);
		}

		return RandomHelper.generator.seed(num);
	}

	range(word, min, max) {
		let val = this.value(word);

		return val * (max - min) + min;
	}

	rangeInt(word, min, max) {
		return ~~this.range(word, min, max);
	}
};

module.exports = RandomHelper;