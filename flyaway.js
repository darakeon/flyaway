function addStar(event) {
	document.getElementById('sky').innerHTML = 
		'<span class="star" style="top: ' + (event.y-2) + 'px; left: ' + (event.x-2) + 'px"></span>'
		+ document.getElementById('sky').innerHTML
}

function getTime() {
	const date = new Date()

	let hour = date.getHours()
	let minute = date.getMinutes()
	let second = date.getSeconds()
	let total = second + 60 * ( minute + 60 * hour )

	if (hour < 10) hour = '0' + hour
	if (minute < 10) minute = '0' + minute
	if (second < 10) second = '0' + second

	return { hour, minute, second, total }
}

function setDelay() {
	const animated = [
		document.getElementsByTagName('body')[0],
		document.getElementById('sky'),
		document.getElementById('sun'),
		document.getElementById('moon'),
		document.getElementById('sea'),
		document.getElementById('boat'),
	]
	
	const time = getTime()

	const sixHourStart = 6 * 60 * 60
	const delay = time.total - sixHourStart
	
	const oneDay = 24 * 60 * 60
	if (delay < 0) {
		delay += oneDay
	}
	
	animated.forEach(element => {
		element.style.animationDelay += `-${delay}s`
	})
}
setDelay()
