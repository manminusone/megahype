const nameform = document.getElementById('formit');
const hypediv = document.getElementById('hypediv');




function logsubmit(evt) {
    // console.log(evt);
    hypediv.innerHTML = '<h1>Hi mom </h1>';
    evt.preventDefault();
}

nameform.addEventListener('submit', logsubmit);