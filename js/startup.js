import { resolveServerURL, resolveRegionURL } from './util.js';

// Get the default settings from the settings.json file
await getSettings();
async function getSettings() {
    fetch("./settings.json")
    .then((res) => res.json())
    .then((data) => {
        // Store the settings in local storage
        setSettings(data);
    }).catch((error) => {
        console.log(`ERROR: ${error}`);
    });
}

// Store the settings read from settings.json in local storage
function setSettings(settings){
    localStorage.setItem('targetProxy', settings.targetProxy);
    //localStorage.setItem('targetProxy', "http://localhost:3000");

    localStorage.setItem('gameName', settings.gameName);
    localStorage.setItem('tag', settings.tag);

    localStorage.setItem('serverName', settings.serverName);
    localStorage.setItem('serverURL', resolveServerURL(settings.serverName));
    localStorage.setItem('serverRegionURL', resolveRegionURL(settings.serverName));

    localStorage.setItem('splashArt', settings.splashArt);
    
    localStorage.setItem('dragonVersion', settings.dragonVersion);
}
let targetProxy = localStorage.getItem("targetProxy");
let dragonVersion = localStorage.getItem("dragonVersion");

// Render the current settings stored in local memory to the webpage
await setup(localStorage.getItem("gameName"), localStorage.getItem("tag"), localStorage.getItem("splashArt"));
export async function setup(gameName, tag, splashArt) {
    setTitle(gameName, tag);
    setBG(splashArt);

    await getPUUID(localStorage.getItem("serverRegionURL"), gameName, tag);
    await getUsername(localStorage.getItem("serverRegionURL"), localStorage.getItem("PUUID"));
    await getIconAndLevel(localStorage.getItem("serverURL"), localStorage.getItem("PUUID"));
}

// Sets the title of the webpage to the users RiotID
function setTitle(gameName, tag){
    document.title = `${gameName}#${tag}'s stats`;
}

// Sets the background of the webpage to the one saved in local memory
function setBG(splashArt){
    document.getElementById("bgImage").setAttribute("src", `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${splashArt}.jpg`);
}

// Gets the PUUID of the given RiotID
// Saves PUUID in local memory
// Display the PUUID as a profileIcon title
async function getPUUID(serverRegionURL, gameName, tag) {
    const PUUID = await fetch(`${targetProxy}/getPUUID?region=${serverRegionURL}&gameName=${gameName}&tag=${tag}`)
    .then((res) => res.json())
    .catch((error) => {
        console.log(`ERROR: ${error}`);
    });
    if(PUUID != undefined) { document.getElementById("profileIcon").setAttribute("title", `User PUUID: ${PUUID}`) };
    localStorage.setItem('PUUID', PUUID);
}

// Gets the RiotID of the given PUUID
// Saves PUUID in local memory
// Display the RiotID
async function getUsername(serverRegionURL, PUUID) {
    const riotID = await fetch(`${targetProxy}/getRiotID?region=${serverRegionURL}&PUUID=${PUUID}`)
    .then((res) => res.json())
    .catch((error) => {
        console.log(`ERROR: ${error}`);
    });
    if(riotID != undefined) { document.getElementById("riotID").innerHTML = `${riotID}` };
}

// Gets the profileIconId and summonerLevel of the given PUUID
// Saves profileIconId and summonerLevel in local memory
// Display the profileIconId and summonerLevel
async function getIconAndLevel(serverURL, PUUID) {
    const iconAndLevel = await fetch(`${targetProxy}/getIconAndLevel?server=${serverURL}&PUUID=${PUUID}`)
    .then((res) => res.json())
    .catch((error) => {
        console.log(`ERROR: ${error}`);
    });
    const profileIconId = iconAndLevel.profileIconId;
    const summonerLevel = iconAndLevel.summonerLevel;

    favicon.setAttribute("href", `https://ddragon.leagueoflegends.com/cdn/${dragonVersion}/img/profileicon/${profileIconId}.png`);
    document.getElementById("profileIcon").setAttribute("src", `https://ddragon.leagueoflegends.com/cdn/${dragonVersion}/img/profileicon/${profileIconId}.png`);
    if(summonerLevel != undefined) { document.getElementById("summonerLevel").innerHTML = `${summonerLevel}` };

    localStorage.setItem('profileIconId', profileIconId);
    localStorage.setItem('summonerLevel', summonerLevel);
}