function addStar(event) {
	document.getElementById('sky').innerHTML = 
		'<span class="star" style="top: ' + (event.y-2) + 'px; left: ' + (event.x-2) + 'px"></span>'
		+ document.getElementById('sky').innerHTML
}
