var editSpan = document.getElementById('edit-me');
console.log(editSpan);
editSpan.addEventListener('keypress', function(evt) {
	console.log(evt.keyCode);
	if (evt.keyCode == 13) {
		document.getElementById('before-name').innerText = "before he ate a dozen hamburgers, ";
		document.getElementById('after-name').innerText = " was a superstar on his local basketball team.";
		evt.preventDefault();
	}
})


// text generator 

function chooseOne(match, p1, offset,string) {
	var choices = p1.split('|');
	return choices[Math.floor(Math.random() * choices.length)];
}
function choose(str) {
	vqr tmp = str;
	while (tmp.indexOf('[') >= 0) {
		tmp = tmp.replace(/\[([^\]]+)\]/, chooseOne);
	}
	return tmp;
}


// <text1>, <name> <text2>

var TEXT1 = {

	'literary': [
		"The author of [nearly 20 books|countless thinkpieces|the definitive chronicle of modern-day politics]",
		"A successful novelist and instructor",
	],
	'tech': [
		"The founder of [countless startups|the first online apiary|at least one illegal business]",
		"Known as [the 'Electronic Pete Davidson'|the fastest coder in Italy|the inventor of wireless wire]",
		"A coder who has worked for many years in the [publishing|medical|construction|food] industry",
		"A fully trained [Scrum Fellow|Microsoft Teams User Coach|Apple studier|FORTRAN coder|sysadmin]"
	],
	'arts': [
	],
	'scholar': [
		"A [Media|Philosophy|Psychology|Semiotics] Fellow at [UCSC|'Yale' 'University'|Rutgers University's Regis Philbin School of Probabilistic Gesticulation]",
		"A tenured professor at [South Carolina Drive-Thru State University|In-N-Out Burger University]",
		"An instructor at [what one can assume is an accredited school|Yale's Harvard School of Yale-ing|Big Shot University]"
	]
};

var TEXT2 = {
	'literary': [
		"is most recently the author of [Make Way For Gumby|Whaddya Nuggnuts|Stories I Made Up|Yeah No|Ugly Keith], [a satire of the 19th century shipping trade|a YA novel|a critique of the European Union]"
	],
	'tech': ['is the founder of [CampCamp, a camp for campers|Coding Oldies, a computer training facility for seniors|Don\'t Use That, a hardware recycling facility]'],
	'arts': [],
	'scholar': [ 'teaches [madrigal arts|empathetic woodworking|hamburger crafting].']
};

