var Megahype = (function() {
	
	'use strict';

/* grammar 

	<intro-clause> , <name> <desc-sentence> 
	<name> <desc-sentence>
*/

	const GRAMMAR = {

		'intro-clause': {
			'literary': [ 
			'A writer with [a few|several|many|quite a few] [pencils|strange habits|online fans|credits to %p name]'
			],
			'tech': [ 
				'Known in [the tech biz|the "cyber-space"|online communities|subreddits] as "[a c00l d00d]" '
			],
			'arts': [
				'A self-[taught|described|promoted] [outsider artist|community artist|amateur artist]'
			],
			'scholar': [
			]
		},
		'desc-sentence': {
			'literary': [ 
				'is the author of [several|many|countless] [books|articles|thinkpieces|essays|blog posts|Medium articles][| about [the state of [the nation|our culture|the world|international relations]|the modern TV series|the [philosophy|religious symbolism] [within|of|encoded within] [the MCU films|the James Bond film series]]]',
			],
			'tech': [ 
				'is the [creator|CEO|COO] of [Calci|Pedi|Minto|Gello][phane|drop|tek|-Rama], [a local nonprofit|a local start-up|a nation-wide organization] for [treating kids as equals|recycling [paste|metal|computers|cars|old car tires|DVDs]].'
			],
			'arts': [
			],
			'scholar': [
			]
		}

	};


	function pronoun(str) { 
		return str.replace('%s',PRONOUN['subj'])
		.replace('%o',PRONOUN["obj"])
		.replace('%p',PRONOUN['poss']); 
	}

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

	var PRON = {"subj": "they", "obj": "them", "poss": "their" };
	return {

		pronouns: function(subj,obj,poss) {
			PRON['subj'] = subj;
			PRON['obj']  = obj;
			PRON['poss'] = poss;
		}
	};
})();
