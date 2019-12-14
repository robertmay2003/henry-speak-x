let Input = class Input {

	constructor(string) {
		this.full = string;
		this.words = string.split(" ");
	}

	word(index) {
		if (index < this.words.length) return this.words[index];
	}
};

module.exports = Input;