const nameform = document.getElementById('formit');
const yourname = document.getElementById('yourname');
const hypediv = document.getElementById('hypediv');

const pronouns = {
    "male": { "s": "he", "S": "He", "o": "him", "p": "his", "P": "His", "x": "himself" },
    "female": { "s": "she", "S": "She", "o": "her", "p": "her", "P": "Her", "x": "herself" },
    "plural": { "s": "they", "S": "They", "o": "them", "p": "their", "P": "Their", "x": "themself" }
};
var filereq = new XMLHttpRequest();
var grammar;

function errorJson(evt) {
    console.log(evt);
}
function parseJson(evt) {
    grammar = JSON.parse(evt.target.response);
}

var CHOOSECACHE = [];
function choose(key) {
    var obj = grammar[key];
    if (! obj) {
        console.error(key,'key not found in grammar');
        return "";
    }
    if (Array.isArray(obj)) {
        if (obj.length == 1)
            return obj[0];
        var choice = Math.floor(Math.random() * obj.length);
        while (CHOOSECACHE[key] && CHOOSECACHE[key] == choice)
            choice = Math.floor(Math.random() * obj.length);
        CHOOSECACHE[key] = choice;
        return obj[choice];
    }
    return obj;
}

function makeIntro() {
    str = choose('main');
    newstr = str.replace(/{([^}]+)}/g, function(m,s1) { return choose(s1) });

    while (newstr != str) {
        str = newstr;
        newstr = str.replace(/{([^}]+)}/g, function(m,s1) { return '<span class="'+s1+'">' + choose(s1) + '</span>' });
    }
    return newstr;
}

function assignPronouns(str, name, prnkey) {
    str = str.replace('%n', name);
    for (var i in pronouns[prnkey]) {
        str = str.replace(new RegExp('%'+i, 'g'), pronouns[prnkey][i]);
    }
    return str;
}
filereq.addEventListener('load', parseJson);
filereq.addEventListener('error', errorJson);
filereq.open('GET','megahype.json');
filereq.send();

function logsubmit(evt) {
    introStr = makeIntro();
    introStr = assignPronouns(introStr, yourname.value, 'male');
    hypediv.innerHTML = '<p> ' + introStr + ' </p>';
    evt.preventDefault();
}

nameform.addEventListener('submit', logsubmit);
