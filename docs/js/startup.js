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

let serverName = localStorage.getItem("serverName");
let serverURL = localStorage.getItem("serverURL");
let serverRegionURL = localStorage.getItem("serverRegionURL");

let PUUID = localStorage.getItem("PUUID");
let gameName = localStorage.getItem("gameName");
let tag = localStorage.getItem("tag");

let profileIconId = localStorage.getItem('profileIconId');
let summonerLevel = localStorage.getItem('summonerLevel');

function setSettings(settings){
    localStorage.setItem('targetProxy', settings.targetProxy);
    //localStorage.setItem('targetProxy', "http://localhost:3000");

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

getIconAndLevel();
async function getIconAndLevel() {
    const iconAndLevel = await fetch(`${targetProxy}/getIconAndLevel?server=${serverURL}&PUUID=${PUUID}`)
    .then((res) => res.json())
    .catch((error) => {
        console.log(`ERROR: ${error}`);
    });
    const profileIconId = iconAndLevel.profileIconId;
    const summonerLevel = iconAndLevel.summonerLevel;

    favicon.setAttribute("href", `https://ddragon.leagueoflegends.com/cdn/14.10.1/img/profileicon/${profileIconId}.png`);
    document.getElementById("summonerLevel").innerHTML = `Summoner Level: ${summonerLevel}`;

    localStorage.setItem('profileIconId', profileIconId);
    localStorage.setItem('summonerLevel', summonerLevel);
}