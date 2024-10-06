let targetProxy = localStorage.getItem("targetProxy");
let serverRegionURL = localStorage.getItem("serverRegionURL");
let PUUID = localStorage.getItem("PUUID");

export async function getLastXGamesID(startTime, endTime, type, start, count) {
    const gameIDs = await fetch(`${targetProxy}/getXGameIDs?region=${serverRegionURL}&PUUID=${PUUID}&start=${start}&count=${count}&startTime=${startTime}&endTime=${endTime}&type=${type}`)
    .then((res) => res.json())
    .catch((error) => {
        console.log(`ERROR: ${error}`);
    });
    document.getElementById("matchesID").innerHTML = gameIDs;
};