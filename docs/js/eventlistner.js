import { resolveServerURL, resolveRegionURL } from './util.js';
import { getLastXGamesID } from "./getgamedata.js";
import { setup } from "./startup.js";

document.getElementById("profileIcon").addEventListener("click", () => {
    var PUUID = document.getElementById("profileIcon").getAttribute("title");
    PUUID = PUUID.replace("User PUUID: ", "");
    navigator.clipboard.writeText(PUUID);
});

document.getElementById("updateUserButton").addEventListener("click", () => {
    const gameName = document.getElementById("gameName").value;
    const tag = document.getElementById("tag").value;
    const serverName = document.getElementById("serverName").value;
    const splashArt = document.getElementById("splashArt").value;

    localStorage.setItem('gameName', gameName);
    localStorage.setItem('tag', tag);
    localStorage.setItem('serverName', serverName);
    localStorage.setItem('serverURL', resolveServerURL(serverName));
    localStorage.setItem('serverRegionURL', resolveRegionURL(serverName));
    localStorage.setItem('splashArt', splashArt);

    setup(gameName, tag, splashArt);
});

document.getElementById("updateButton").addEventListener("click", () => {
    const startTime = document.getElementById("startTime").value;
    const endTime = document.getElementById("endTime").value;
    const type = document.getElementById("type").value;
    const start = document.getElementById("start").value;
    const count = document.getElementById("count").value;
    getLastXGamesID(startTime, endTime, type, start, count);
});
