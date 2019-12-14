let TranslatorRules = class TranslatorRules {
	constructor(firm, names, beverages, nameReplacements, whoReplacements, coolReplacements, veryReplacements, beverageReplacements) {
		this.firm = firm || ['a','e','i','o','u','y',' ','.',',',';',':','"','\'','!','?','r','l'];
		this.names = names || "Noah Liam Mason Jacob William Ethan James Alexander Michael Benjamin Elijah Daniel Aiden Logan Matthew Lucas Jackson David Oliver Jayden Joseph Gabriel Samuel Carter Anthony John Dylan Luke Henry Andrew Isaac Christopher Joshua Wyatt Sebastian Owen Caleb Nathan Ryan Jack Hunter Levi Christian Jaxon Julian Landon Grayson Jonathan Isaiah Charles Lydia Thomas Aaron Eli Connor Jeremiah Cameron Josiah Adrian Colton Jordan Brayden Nicholas Robert Angel Hudson Lincoln Evan Dominic Austin Gavin Nolan Parker Adam Chase Jace Ian Cooper Easton Kevin Jose Tyler Brandon Asher Jaxson Mateo Jason Ayden Zachary Carson Xavier Leo Ezra Bentley Sawyer Kayden Blake Nathaniel Gerald Robert Avi Ben Oscar Lucas Sequoyah Jude".toLowerCase().split(" ");
		this.beverages = beverages || "beer tea brandy cocoa cocktail coffee coke juice lemonade liquor milk milkshake punch soda water whiskey wine".toLowerCase().split(" ");

		this.nameReplacements = nameReplacements || ['Geoff', 'Geff', 'Jeff', 'Jeoff', 'Jeoffery', 'Geoffery', 'Polnajeff', 'Bool-Aid Man', 'Nama Jeff', 'Beter'];
		this.whoReplacements = whoReplacements || ['whomst', 'whomst\'d', 'whomst\'d\'ve', 'whomst\'th'];
		this.coolReplacements = coolReplacements || ['swagbucks', 'big swagbucks', 'mega swagbucks', 'enormous swagbucks', 'large swagbucks', 'omnidirectional swagbucks', 'truncated swagbucks', 'flat swagbucks', 'round swagbucks', 'elongated swagbucks', 'spherical swagbucks', 'lanky swagbucks', 'greato daze', 'mad swagbucks', 'very niceu, Caesarino', 'swagbuck', 'singular swagbuck', 'swagbux', 'robux', 'robuck'];
		this.veryReplacements = veryReplacements || ['big', 'large', 'long', 'grand', 'fat', 'pickle', 'mad', 'mega'];
		this.beverageReplacements = beverageReplacements || ['bepis', 'bobabola', 'bool-aid', 'boctor bepper'];
	}
};

module.exports = TranslatorRules;