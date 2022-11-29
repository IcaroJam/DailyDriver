import defaults from './default_conf_test.json' assert {type: 'json'};
// Get the initial config file from the local cache:
let	initConf = JSON.parse(localStorage.getItem("default_conf_test.json"));
if (initConf == undefined) {
	initConf = defaults;
}
localStorage.setItem("default_conf_test.json", JSON.stringify(initConf));



initConf = defaults; // Overwrite local storage (should be removed once the defaults are done).

handleErrors();

loadContent(initConf["startTime"], initConf["endTime"]);

function handleErrors() {
	if (initConf.startTime === initConf.endTime | initConf.startTime < 0 || initConf.endTime < 0 || initConf.startTime > 23 || initConf.endTime > 23) {
		initConf.startTime = 9;
		initConf.endTime = 18;
		console.log("Bad start-end times, falling back to defaults.")
	}
}

function loadContent(sTime, eTime) {
	const bar = document.getElementById("sideBar");
	const taskBar = document.getElementById("taskBar");
	const variables = getComputedStyle(document.querySelector(":root"));
	const timeSpan = sTime > eTime ? (24 + eTime - sTime) : eTime - sTime;
	bar.style.height = 160 * timeSpan + 10 + "px";

	// This falls one short of the endTime:
	while (sTime !== eTime) {
		const newCell = document.createElement("div");
		newCell.className = "sideElement";
		const cellText = document.createTextNode(sTime);
		newCell.appendChild(cellText);
		bar.appendChild(newCell);

		const newTaskBack = document.createElement("div");
		newTaskBack.className = "taskElement";
		newTaskBack.style.backgroundColor = sTime % 2 ? variables.getPropertyValue("--subdivColour2") : variables.getPropertyValue("--subdivColour3");
		taskBar.appendChild(newTaskBack);

		sTime++;
		if (sTime === 24)
			sTime = 0;
	}
}
