// Call newTaskSave on form submission
const form = document.getElementById("newTaskForm");

// Define the newTask window element
const container = document.getElementById("newTaskDDMenu");

function newTaskPop() {
	container.style.display = "block";
}

function newTaskHide() {
	container.style.display = "none";
}

function newTaskSave() {
	const newTask = {
		description:	document.getElementsByName("newTaskDescription")[0].value,

		startHour:		parseInt(document.getElementsByName("newTaskStartHour")[0].value),
		startMin:		document.getElementsByName("newTaskStartMin")[0].value,
		startTime:		0,

		endHour:		parseInt(document.getElementsByName("newTaskEndHour")[0].value),
		endMin:			document.getElementsByName("newTaskEndMin")[0].value,
		endTime:		0,
	}
	//Check if the time input values are correct
	if (
		isNaN(newTask.startHour) || isNaN(newTask.startMin) ||
		isNaN(newTask.endHour) || isNaN(newTask.endMin) ||
		newTask.startHour < 0 || newTask.startHour > 23 ||
		newTask.startMin < 0 || newTask.startMin > 59 ||
		newTask.endHour < 0 || newTask.endHour > 23 ||
		newTask.endMin < 0 || newTask.endMin > 59 ||
		newTask.startHour > newTask.endHour ||
		(newTask.startHour == newTask.endHour && newTask.startMin > newTask.endMin) ||
		newTask.description == ""
	) {
	//	if they aren't, put the fields in red or something and display an error message next to them
		return;
	}
	//if they are set display to none and reset form fields
	newTaskHide();
	form.reset();
	
	//Do some final calculations
	newTask.startMin /= 60;
	newTask.startTime = newTask.startHour + newTask.startMin;
	newTask.endMin /= 60;
	newTask.endTime = newTask.endHour + newTask.endMin;

	//Append the new task object with the information passed in the form
	tasks.array.push(newTask);

	//Sort the task object
	tasks.array.sort(function(a, b) {
		if (a.startHour != b.startHour)
			return a.startHour - b.startHour;
		else
			return a.startMin - b.startMin;
	});

	//Store that object in the local storage
	localStorage.setItem("currentTasks", JSON.stringify(tasks));

	//Clean the current displayed tasks to reload them immeadiately
	const taskZone = document.getElementById("taskContainer");
	let vanishingTask = taskZone.lastElementChild;
	while (vanishingTask) {
		taskZone.removeChild(vanishingTask);
		vanishingTask = taskZone.lastElementChild;
	}

	//Call the loadTasks function globalized from config
	loadTasks();

	//profit?
}
