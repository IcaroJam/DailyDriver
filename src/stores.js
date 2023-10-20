import { writable } from "svelte/store";
import { defaults as configFile } from "./defaultConf";

export const defaults = writable(configFile);
