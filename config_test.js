import defaults from "./default_conf_test.json" assert {type: json};
/* Get the initial config file from the local cache: */
let	initConf = localStorage.getItem("default_conf_test.json");
if (!initConf) {
	initConf = defaults;
	localStorage.setItem("default_conf_test.json", JSON.stringify(initConf));
}


