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
		startMin:		document.getElementsByName("newTaskStartMin")[0].value / 60,
		startTime:		0,

		endHour:		parseInt(document.getElementsByName("newTaskEndHour")[0].value),
		endMin:			document.getElementsByName("newTaskEndMin")[0].value / 60,
		endTime:		0,
	}
	//Check if the time input values are correct
	if (
		newTask.startHour < 0 || newTask.startHour > 23 ||
		newTask.startMin < 0 || newTask.startMin > 59 ||
		newTask.endHour < 0 || newTask.endHour > 23 ||
		newTask.endMin < 0 || newTask.endMin > 59 ||
		newTask.startHour >= newTask.endHour ||
		(newTask.startHour == newTask.endHour && newTask.startMin >= newTask.endMin) ||
		newTask.description == ""
	) {return;}
	//	if they aren't, put the fields in red or something and display an error message next to them
	//if they are set display to none
	//create a new task object with the information passed in the form
	//(? try to keep the tasks in time order if possible
	//store that object in the local storage
	//wipe clean the task container and call the loadTasks function from config
	//profit?
	newTaskHide();
	form.reset();
}
