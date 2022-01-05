function addStar(event) {
	addStarStorage(event.x, event.y)
	addStarSky(event.x, event.y)
}

function addStarStorage(x, y) {
	let stars = localStorage.getItem('stars')

	if (!stars)
		stars = []
	else
		stars = JSON.parse(stars)

	stars.push({x, y})

	localStorage.setItem('stars', JSON.stringify(stars))
}

function addStarSky(x, y) {
	const sky = document.getElementById('sky')
	sky.innerHTML += `
		<span class="star"
			style="top: ${y-2}px; left: ${x-2}px">
		</span>
	`
}

function recoverStars() {
	let stars = localStorage.getItem('stars')
	if (!stars) return
	stars = JSON.parse(stars)

	stars.forEach(star => {
		addStarSky(star.x, star.y)
	});
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

function setClock() {
	const time = getTime()

	const hourDigits = document
		.getElementById('hour')
		.getElementsByClassName('digit')

	const hourUnit = time.hour % 10
	const hourDec = (time.hour - hourUnit) / 10
	hourDigits[0].classList.remove(`number-${(hourDec+9)%10}`)
	hourDigits[0].classList.add(`number-${hourDec}`)
	hourDigits[1].classList.remove(`number-${(hourUnit+9)%10}`)
	hourDigits[1].classList.add(`number-${hourUnit}`)

	const minuteDigits = document
		.getElementById('minute')
		.getElementsByClassName('digit')

	const minuteUnit = time.minute % 10
	const minuteDec = (time.minute - minuteUnit) / 10
	minuteDigits[0].classList.remove(`number-${(minuteDec+9)%10}`)
	minuteDigits[0].classList.add(`number-${minuteDec}`)
	minuteDigits[1].classList.remove(`number-${(minuteUnit+9)%10}`)
	minuteDigits[1].classList.add(`number-${minuteUnit}`)
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

setClock()
setInterval(setClock, 1000 * 30)
setDelay()
recoverStars()
