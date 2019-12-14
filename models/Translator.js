const TranslatorRules = require('./TranslatorRules');
const RandomHelper = require('./RandomHelper');
const Input = require('./Input');

let Translator = class {

	constructor(rules) {
		this.rules = rules || new TranslatorRules();
		this.random = new RandomHelper("");
	}

	translate(string) {
		let full = '';

		this.random = new RandomHelper(string);
		let input = new Input(string.toString().toLowerCase());

		for (let index in input.words) {
			full += this._translateWord(input, index) + ' ';
		}

		return full;
	}

	// Whether or not a letter can be replaced by a B
	_isSignificant(str, ind) {
		let isSignificant = (this.rules.firm.includes(str[ind])) ||
			(str[ind] === 'l' || str[ind] === 'r') ||
			(str[ind - 1] === str[ind] || str[ind + 1] === str[ind]) ||
			(str[ind] === 'w' && this.rules.firm.includes(str[ind - 1])) ||
			(this.rules.firm.includes(str[ind + 1]) === false || this.rules.firm.includes(str[ind + 1]) === false) ||
			(str[ind] === 'h' && this.rules.firm.includes(str[ind - 1]) === false);

		return isSignificant;
	}

	// Find the mode (most common) consonant
	_stringMode(str) {
		// Record consonant occurrences
		let cons = [];
		for (let char of str) {
			let inList = false;
			for (let con of cons) {
				if (con[0] === char) { inList = true; }
			}

			if (!this.rules.firm.includes(char)) {
				if (!inList) { cons.push([char, 0]); }
				for (let con of cons) {
					if (con[0] === char) { con[1] += 1; }
				}
			}
		}

		// Get mode
		let mode = 'none';
		let modenum = 0;
		for (let con of cons) {
			if (con[1] > modenum) {
				mode = con[0];
				modenum = con[1];
			} else if (con[1] === modenum) {
				mode = 'none'
			}
		}

		// 3 is minimum to constitute mode
		if (modenum > 2) {
			return mode;
		} else {
			return 'none'
		}
	}

	_addBs(word) {
		let final = '';
		let stringMode = this._stringMode(word);

		if (stringMode === 'none') {
			// Change every insignificant letter to B
			let ind = 0;
			for (let char of word) {
				if (this._isSignificant(word, ind)) {
					final += char;
				} else {
					final += 'b';
				}

				ind += 1;
			}
		} else {
			for (let char of word) {
				if (char !== stringMode) {
					final += char;
				} else {
					final += 'b';
				}
			}
		}

		return final;
	}

	_translateWord(input, index) {
		let word = input.word(index);
		let nextWord = input.word(index+1);

		if (word === 'rick') {
			return `Pickle ${this._getJeff(input, index)}`;
		} else if ((word === 'are' || word === 'am') && nextWord !== 'a' && nextWord !== 'the' && nextWord !== 'an') {
			return 'have';
		} else if ((word === 'was' || word === 'were') && nextWord !== 'a' && nextWord !== 'the' && nextWord !== 'an') {
			return 'had';
		} else if (word === 'is' && nextWord !== 'a' && nextWord !== 'the' && nextWord !== 'an') {
			return 'has';
		} else if (word ==='a') {
			return 'a';
		} else if (word === 'like') {
			return 'perhaps enjoy';
		} else if (word === 'want') {
			return 'require';
		} else if (word === 'wanted') {
			return 'required';
		} else if (word === 'wants') {
			return 'requires';
		} else if (word === 'who' || word === 'whom') {
			let who = this.rules.whoReplacements[this.random.rangeInt(word, 0, this.rules.whoReplacements.length)];

			return who;
		} else if (this.rules.names.includes(word)) {
			let joestar = this.random.value(word) < 0.2;
			let name = this.rules.nameReplacements[this.random.rangeInt(word, 0, this.rules.nameReplacements.length)];

			if (joestar) { name += ` ${name[0]}oestar`; }
			return name;
		} else if (word === 'cool' || word === 'awesome' || word === 'good' || word === 'great') {
			let cool = this.rules.coolReplacements[this.random.rangeInt(word, 0, this.rules.coolReplacements.length)];

			return cool;
		} else if (word === 'very' || word === 'exceedingly' || word === 'really')
		{
			let very = this.rules.veryReplacements[this.random.rangeInt(word, 0, this.rules.veryReplacements).length];

			return very;
		} else if (this.rules.beverages.includes(word)) {
			let extension = this.random.value(word) < 0.1;
			let beverage = this.rules.beverageReplacements[this.random.rangeInt(word, 0, this.rules.beverageReplacements.length)];

			if (extension) {beverage += ' (the beverage for children with swagger)'}
			return beverage;
		} else if (word.length < 4) {
			return word;
		} else if (word.length <6) {
			let bWord = word;
			bWord = 'b' + bWord.substr(1);
			return bWord;
		} else {
			return this._addBs(word);
		}
	}
};

module.exports = Translator;