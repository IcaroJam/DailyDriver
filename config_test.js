import defaults from './default_conf_test.json' assert {type: 'json'};
import taskTest from './testTasks.json' assert {type: 'json'};
// Get the initial config file from the local cache:
let	initConf = JSON.parse(localStorage.getItem("default_conf_test.json"));
if (initConf == undefined) {
	initConf = defaults;
}
localStorage.setItem("default_conf_test.json", JSON.stringify(initConf));
// Get and load notes if there are any stored:
let	tasks = JSON.parse(localStorage.getItem("currentTasks"));
if (tasks == undefined) {
	localStorage.setItem("currentTasks", JSON.stringify(taskTest));
}



initConf = defaults; // Overwrite local storage (should be removed once the defaults are done).

handleErrors();

loadAreas(initConf.startTime, initConf.endTime);
loadTasks();

function handleErrors() {
	if (initConf.startTime === initConf.endTime | initConf.startTime < 0 || initConf.endTime < 0 || initConf.startTime > 23 || initConf.endTime > 23) {
		initConf.startTime = 9;
		initConf.endTime = 18;
		console.log("Bad start-end times, falling back to defaults.")
	}
}

function timeFromStart(sTime, eTime) {
	return sTime > eTime ? (24 + eTime - sTime) : eTime - sTime;
}

function loadAreas(sTime, eTime) {
	const bar = document.getElementById("sideBar");
	const taskBar = document.getElementById("taskBar");
	const variables = getComputedStyle(document.querySelector(":root"));
	const timeSpan = sTime > eTime ? (24 + eTime - sTime) : eTime - sTime;

	bar.style.height = 160 * (timeSpan + 1) + 10 + "px";
	while (sTime !== eTime + 1) {
		const newCell = document.createElement("div");
		newCell.className = "sideElement";
		const cellText = document.createTextNode(sTime);
		newCell.appendChild(cellText);
		bar.appendChild(newCell);

		const newTaskBack = document.createElement("div");
		newTaskBack.className = "taskElement";
		newTaskBack.style.backgroundColor = sTime % 2 ? variables.getPropertyValue("--subdivColour2") : variables.getPropertyValue("--subdivColour3");
		taskBar.appendChild(newTaskBack);

		if (sTime === 24)
			sTime = 0;
		else
			sTime++;
	}
}

function loadTasks() {
	const taskZone = document.getElementById("taskContainer");

	for (let i in tasks.array) {
		const timeSpan = timeFromStart(tasks.array[i].startTime, tasks.array[i].endTime);
		const newTask = document.createElement("div");
		const taskText = document.createTextNode(tasks.array[i].description);
	
		newTask.appendChild(taskText);
		newTask.className = "task";
		newTask.style.height = 170 * timeSpan + "px";
		newTask.style.top = 160 * timeFromStart(initConf.startTime, tasks.array[i].startTime) + 5 + "px";
		taskZone.appendChild(newTask);
	}
}
