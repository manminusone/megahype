const nameform = document.getElementById('formit');
const yourname = document.getElementById('yourname');
const hypediv = document.getElementById('hypediv');

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
        console.log('key not found in grammar');
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
    console.log('str',str);
    newstr = str.replace(/{([^}]+)}/g, function(m,s1) { return choose(s1) });

    while (newstr != str) {
        console.log(newstr);
        str = newstr;
        newstr = str.replace(/{([^}]+)}/g, function(m,s1) { return choose(s1) });
    }
    return newstr;
}

filereq.addEventListener('load', parseJson);
filereq.addEventListener('error', errorJson);
filereq.open('GET','megahype.json');
filereq.send();

function logsubmit(evt) {
    grammar['name'] = yourname.value;
    // console.log(evt);
    hypediv.innerHTML = '<p> ' + makeIntro() + ' </p>';
    evt.preventDefault();
}

nameform.addEventListener('submit', logsubmit);