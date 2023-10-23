import { browser } from "$app/environment";
import { writable } from "svelte/store";
import { defaults as configFile } from "./defaultConf";

export const defaults = writable(configFile);

export const tasksList = writable(
	browser && JSON.parse(localStorage.getItem("dailydriver_tasks")) || []
);
