import { resolveServerURL, resolveRegionURL } from './util.js'

getSettings();
async function getSettings() {
    fetch("./settings.json")
    .then((res) => res.json())
    .then((data) => {
        setSettings(data);
    }).catch((error) => {
        console.log(`ERROR: ${error}`);
    });
}

let targetProxy = localStorage.getItem("targetProxy");

let PUUID = localStorage.getItem("PUUID");
let gameName = localStorage.getItem("gameName");
let tag = localStorage.getItem("tag");

let serverName = localStorage.getItem("serverName");
let serverURL = localStorage.getItem("serverURL");
let serverRegionURL = localStorage.getItem("serverRegionURL");


function setSettings(settings){
    //localStorage.setItem('targetProxy', settings.targetProxy);
    localStorage.setItem('targetProxy', "http://localhost:3000");

    localStorage.setItem('gameName', settings.gameName);
    localStorage.setItem('tag', settings.tag);

    localStorage.setItem('serverName', settings.serverName);
    localStorage.setItem('serverURL', resolveServerURL(settings.serverName));
    localStorage.setItem('serverRegionURL', resolveRegionURL(settings.serverName));
}

setTitle();
function setTitle(){
    document.title = `${gameName}#${tag}'s stats`;
}

getPUUID();
async function getPUUID() {
    const PUUID = await fetch(`${targetProxy}/getPUUID?region=${serverRegionURL}&gameName=${gameName}&tag=${tag}`)
    .then((res) => res.json())
    .catch((error) => {
        console.log(`ERROR: ${error}`);
    });
    document.getElementById("puuid").innerHTML = `User PUUID: ${PUUID}`;
    localStorage.setItem('PUUID', PUUID);
}

getUsername();
async function getUsername() {
    const Username = await fetch(`${targetProxy}/getRiotID?region=${serverRegionURL}&PUUID=${PUUID}`)
    .then((res) => res.json())
    .catch((error) => {
        console.log(`ERROR: ${error}`);
    });
    document.getElementById("username").innerHTML = `Username: ${Username}`;
}