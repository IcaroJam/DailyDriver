import { defaults } from './default_conf_test.js';
//import { taskTest } from './testTasks.js';

// Get the initial config file from the local cache:
let	initConf = JSON.parse(localStorage.getItem("configDefaults"));
if (initConf == undefined) {
	initConf = defaults;
}
localStorage.setItem("configDefaults", JSON.stringify(initConf));

// Get and load notes if there are any stored:
let	tasks = JSON.parse(localStorage.getItem("currentTasks"));
if (tasks == undefined) {
	//localStorage.setItem("currentTasks", JSON.stringify(taskTest));
	//tasks = taskTest;
	tasks = {array: []};
}
window.tasks = tasks; // Make it global so it can be used outside module scope.

// Define css colour cssVars
const cssVars = getComputedStyle(document.querySelector(":root"));


initConf = defaults; // Overwrite local storage (should be removed once the defaults are done).

handleErrors();

loadAreas(initConf.startTime, initConf.endTime);
loadTasks();



function handleErrors() {
	if (initConf.startTime === initConf.endTime | initConf.startTime < 0 || initConf.endTime < 0 || initConf.startTime > 23 || initConf.endTime > 23) {
		initConf.startTime = 9;
		initConf.endTime = 18;
		console.log("Bad start-end times, falling back to defaults.");
	}
}

function timeFromStart(sTime, eTime) {
	return sTime > eTime ? (24 + eTime - sTime) : eTime - sTime;
}

function timeString(time) {
	const hours = Math.floor(time);
	const mins = (time - hours) * 60;

	return (`${hours}:${mins}`);
}

function stringTime(time) {
	const hours = parseInt(time);
	const minutes = parseInt(time.substring(time.indexOf(":") + 1)) / 60;

	return (hours + minutes);
}



function loadAreas(sTime, eTime) {
	const bar = document.getElementById("sideBar");
	const taskBar = document.getElementById("taskBar");
	const timeSpan = sTime > eTime ? (24 + eTime - sTime) : eTime - sTime;

	bar.style.height = 160 * (timeSpan + 1) + 10 + "px";
	let currNum;
	for (let i = 0; i <= timeSpan; i++) {
		currNum = sTime + i;
		
		const newCell = document.createElement("div");
		newCell.className = "sideElement";
		const cellText = document.createTextNode(currNum);
		newCell.appendChild(cellText);
		bar.appendChild(newCell);

		const newTaskBack = document.createElement("div");
		newTaskBack.className = "taskElement";
		newTaskBack.style.backgroundColor = currNum % 2 ? cssVars.getPropertyValue("--subdivColour2") : cssVars.getPropertyValue("--subdivColour3");
		taskBar.appendChild(newTaskBack);

		if (currNum === 23)
			sTime = -i - 1;
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
		newTask.style.height = 160 * timeSpan + "px";
		newTask.style.top = 160 * timeFromStart(initConf.startTime, tasks.array[i].startTime) + 5 + "px";
		newTask.style.backgroundColor = i % 2 ? cssVars.getPropertyValue("--sideBarElementColour") : cssVars.getPropertyValue("--sideBarBackColour");
		taskZone.appendChild(newTask);
	}
}
window.loadTasks = loadTasks; // Make it global.