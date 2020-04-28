var date = {
	day: "2020-7-31",
	toDate: undefined,
	remaining: undefined

}

function initialize() {
	let toDate = new Date(date.day);
	let nowDate = new Date();
	let dist = toDate - nowDate;
	date.toDate = toDate;
	date.remaining = dist;
	initDateListener();
	animate();
}

function updateRemainingTime() {
	let nowDate = new Date();
	let dist = date.toDate - nowDate;
	date.remaining = dist;
}

function getReadableTimes(time) {
	var readableTimes = {
		weeks: Math.floor(time / (1000 * 60 * 60 * 24 * 7)),
	    days: Math.floor(time % (1000 * 60 * 60 * 24 * 7) / (1000 * 60 * 60 * 24)),
	    hours: Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
	    minutes: Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)),
	    seconds: Math.floor((time % (1000 * 60)) / 1000)
	}
	readableTimes.fullString = 
	"<div>" +
	readableTimes.weeks + 
	" weeks</div>" +
	readableTimes.days + 
	" days, " + 
	readableTimes.hours +
	" hours, " + 
	readableTimes.minutes +
	" minutes, " + 
	readableTimes.seconds +
	" seconds."

  	return readableTimes;
}

function updateFinishDate() {
	let dateHolderSelectors = [".finish-date"];
	let dateHolders = [];
	// add every element we want the date to be added, to an array (I know, it's overkill. :p )
	for (var i = dateHolderSelectors.length - 1; i >= 0; i--) {
		dateHolders.push(document.querySelectorAll(dateHolderSelectors[i]));
	}
	// Create human readable date.
	const options = {year: 'numeric', month: 'long', day: 'numeric'};
	const humanReadableDate = date.toDate.toLocaleDateString('en-US', options);
	// Add date to proper places.
	for (var i = dateHolders.length - 1; i >= 0; i--) {
		for (var j = dateHolders[i].length - 1; j >= 0; j--) {
			dateHolders[i][j].innerHTML = humanReadableDate;
		}
	}
}

function initDateListener() {
	updateFinishDate();
	var dateChanger = document.querySelector(".date-changer");
	dateChanger.addEventListener("change", function() {
		date.day = dateChanger.value;
		let toDate = new Date(date.day);
		date.toDate = toDate;
		animate();

		updateFinishDate();
	})
}

function animate() {
	const remainingTime = document.querySelector(".remaining-time");
	const readableTimes = getReadableTimes(date.remaining);
	remainingTime.innerHTML = readableTimes.fullString;
	updateRemainingTime();

	if(date.remaining > 0) {
		setTimeout(function() {
			animate();
		}, 1000)
	} else {
		// Do finish thing.
		console.log("finished");
	}
	
	
}

initialize();