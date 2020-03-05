'use strict';


var editSpan = document.getElementById('edit-me');
editSpan.addEventListener('keypress', function(evt) {
	if (evt.keyCode == 13) {
		evt.target.blur();
		evt.preventDefault();
		animateText();
	}
})

var pronounInput = document.getElementById('cp-gender');
var pronounFunc = function(evt) { var foo = evt.target.value.split('-'); PRONOUN['subj'] = foo[0]; PRONOUN['obj'] = foo[1]; PRONOUN['poss'] = foo[2]; };
pronounInput.addEventListener('input', pronounFunc);

// text generator 

var PRONOUN = { "subj": "they", "obj": "them", "poss": "their" };
pronounInput.dispatchEvent(new Event('input'));

function pronoun(str) { return str.replace('%s',PRONOUN['subj']).replace('%o',PRONOUN["obj"]).replace('%p',PRONOUN['poss']); }

function chooseOne(match, p1, offset,string) {
	var choices = p1.split('|');
	return choices[Math.floor(Math.random() * choices.length)];
}
function choose(str) {
	var tmp = str;
	while (tmp.indexOf('[') >= 0) {
		tmp = tmp.replace(/\[([^\]]+)\]/, chooseOne);
	}
	return tmp;
}

var part1Text, part2Text;
var LAST_SPACE = 0;

function deanima() {
	document.getElementById('before-name').innerText = document.getElementById('before-name').innerText.substring(0,document.getElementById('before-name').innerText.length - 1);
	document.getElementById('after-name').innerText = document.getElementById('after-name').innerText.sbustring(1);
	if (document.getElementById('before-name').innerText != '' || document.getElementById('after-name').innerText != '')
		window.setTimeout(deanima,10);
}

function anima() {
	document.getElementById('before-name').innerText = document.getElementById('before-name').innerText + part1Text.substring(0,1);
	part1Text = part1Text.substring(1);
	document.getElementById('after-name').innerText = part2Text.substring(part2Text.length - 1) + (LAST_SPACE ? ' ' : '') + document.getElementById('after-name').innerText;
	LAST_SPACE = 0; if (part2Text.substring(part2Text.length - 1) == ' ') LAST_SPACE = 1;
	part2Text = part2Text.substring(0, part2Text.length - 1);

	if (part1Text != '' || part2Text != '')
		window.setTimeout(anima,10);
}
function animateText() {
	part1Text = PART1();
	part2Text = PART2();
	document.getElementById('before-name').innerText = '';
	document.getElementById('after-name').innerText = '';

	window.setTimeout(anima, 10);
}

function PART1() {
	var key = document.getElementById('cp-topic').value;
	return pronoun(
		choose(
			TEXT1[key][Math.floor(Math.random() * TEXT1[key].length )]
		)
	);
}

function PART2() {
	var key = document.getElementById('cp-topic').value;
	return pronoun(
		choose(
			TEXT2[key][Math.floor(Math.random() * TEXT2[key].length )]
		)
	);
}

// <text1>, <name> <text2>

var TEXT1 = {

	'literary': [
		"The author of [nearly 20 books|countless thinkpieces|the definitive chronicles of modern-day politics], many of which have been published,",
		"A successful novelist and novelist instructor,",
		"A good words person who does all the goodest wordses,",
		"A best-selling novelist for over [10|20|25|30|40|50|80|150] years,",
		"The author of the [highly popular|somewhat popular|technically popular] [book review|book mocking|literature deconstruction] column in [a certain newspaper|Bust|Bitch|the NY Post|the NY Times-Picayune],"
	],
	'tech': [
		"The founder of [countless startups|the first online apiary|at least one illegal business],",
		"Known as [the 'Electronic Pete Davidson'|the fastest coder in Italy|the inventor of wireless wire|the 'Fonzie of the Internet'|a person who technically exists],",
		"A coder who has worked for many years in the [publishing|medical|construction|food|candle|public transportation|party supply] industry,",
		"A fully trained [Scrum Fellow|Microsoft Teams User Coach|Apple studier|FORTRAN coder|sysadmin],",
		"The [head evangelist|CTO|only employee] of [a local tech firm|a certain computer company that we are legally prevented from mentioning here|SqueakTech, a company that teaches coding to rodents],"
	],
	'arts': [
		"A self-trained outsider artist,",
		"A mixed-media artist with over [3|25|1,000] [followers on Instagram|pieces of artwork to %o name|Liberal Arts degrees],",
		"The author of many critiques of [modern|primitive|ancient|psychedelic] art pieces,",
		"A composer who can whistle several melodies,",
		"An artist-in-residence at [the Whitney Cummings Museum of Modern Art|the Whitney Museum Starbucks|Babe Ruth University],"
	],
	'scholar': [
		"A [Media|Philosophy|Psychology|Semiotics] Fellow at [UC Santa Carla|'Yale' 'University'|Rutgers University's Regis Philbin School of Probabilistic Gesticulation],",
		"A tenured professor at [South Carolina Drive-Thru State University|In-N-Out Burger University],",
		"An instructor at [what one can assume is an accredited school|Yale's Harvard School of Yale-ing|Big Shot University],"
	]
};

var TEXT2 = {
	'literary': [
		"is most recently the author of [Make Way For Gumby|Whaddya Nuggnuts|Stories I Made Up|Yeah No|Ugly Keith], [a satire of the 19th century shipping trade|a YA novel|a critique of the European Union].",
		"recently authored a graphic novel about [the life of John Wayne|crop rotation in the 14th century|the contents of %p pants pockets].",
		"just came off a book tour promoting %p latest novel, [That's Why You Wear A Condom|The Waffle House Riddle|Edwin Drood Looks Like A Lady]."
	],
	'tech': [
		'is the founder of [CampCamp, a camp for campers|Coding Oldies, a computer training facility for seniors|Don\'t Use That, a hardware recycling facility].',
		'has recently put %p knowledge to use [at a local Apple Genius Bar|for good, not evil|at a nonprofit millinery, Hat for Humanity].'
	],
	'arts': [
		'has had %p work displayed in [the bathrooms of several prestigious galleries|buildings very close to several nationally significant museums|several big-shot art exhibits].',
		'is the editor of [Fignuts, a literary journal for the catheter industry|Portent, an annual review of the best speculative fiction about celebrities|the membership publication of the Rock & Roll Hall of Fame].',
		'is the composer of a new [opera|operetta|symphony|cinematic score] premiering at [the Venice Biennale|the King of Prussia, Pennsylvania Symphony Center|the Netflix Center for the Performing Arts].',
		'is the lead dancer in a new production of [Babes in Toyland|Make Way For Ducklings: the Musical|El Santo vs The Nutcracker|Delibes\' "Le mariage de Muriel"].',
		'has most recently had a film in competition at the [Bakersfield|New Castle|Amarillo|Memphis|Park Slope] Film Festival.'
	],
	'scholar': [ 
		'is the author of several papers, including [a deconstruction of the "Brady Bunch" theme song|an analysis of game shows from the 1970s|].',
		'teaches [madrigal arts|empathetic woodworking|hamburger crafting] to [the general public|vaguely interested students|famous people who don\'t know better].'
	]
};

