import { browser } from "$app/environment";
import { writable } from "svelte/store";
import { defaults as configFile } from "./defaultConf";

export const defaults = writable(configFile);

export const tasksList = writable(
	// Retrieve the tasks from local storage ONLY if we are on clientside (svelte will throw an error if serverside since localstorage isn't defined there)
	browser && JSON.parse(localStorage.getItem("dailydriver_tasks")) || []
);
