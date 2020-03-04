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