import defaults from './default_conf_test.json' assert {type: 'json'};
/* Get the initial config file from the local cache: */
let	initConf = JSON.parse(localStorage.getItem("default_conf_test.json"));
	initConf = defaults;
if (initConf == undefined) {
	initConf = defaults;
}
localStorage.setItem("default_conf_test.json", JSON.stringify(initConf));

loadSideBar(initConf["startTime"], initConf["endTime"]);

function loadSideBar(sTime, eTime) {
	// Handle bad inputs:
	if (sTime === eTime | sTime < 0 || eTime < 0 || sTime > 23 || eTime > 23) {
		sTime = 9;
		eTime = 18;
		console.log("Bad start-end times, falling back to defaults.")
	}

	const bar = document.getElementById("sideBar");
	const timeSpan = sTime > eTime ? (24 + eTime - sTime) : eTime - sTime;
	bar.style.height = 160 * timeSpan + 10 + "px";

	// This falls one short of the endTime:
	while (sTime !== eTime) {
		const newCell = document.createElement("div");
		newCell.className = "sideElement";
		const cellText = document.createTextNode(sTime);
		newCell.appendChild(cellText);
		bar.appendChild(newCell);

		sTime++;
		if (sTime === 24)
			sTime = 0;
	}
}
