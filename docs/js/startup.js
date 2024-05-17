import { resolveServerURL, resolveRegionURL } from './util.js'

getSettings();
async function getSettings() {
    fetch("./settings.json")
    .then((res) => res.json())
    .then((settings) => {
        setTitle(settings.gameName, settings.tag);
        
        console.log(getPUUID(settings.APIKey, settings.serverName, settings.gameName, settings.tag))
    }).catch((error) => {
        console.log(`ERROR: ${error}`);
    });
}

function setTitle(gameName, tag){
    document.title = `${gameName}#${tag}'s stats`;
}

async function getPUUID(APIKey, serverName, gameName, tag) {
    var PUUID = "Failed to retrieve PUUID";
    console.log(`https://${resolveRegionURL(serverName)}/riot/account/v1/accounts/by-riot-id/${gameName}/${tag}?api_key=${APIKey}`);
    await fetch(`https://${resolveRegionURL(serverName)}/riot/account/v1/accounts/by-riot-id/${gameName}/${tag}?api_key=${APIKey}`, {
        method: "GET",
        mode: "cors",
        headers: {
            "Accept": "	text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
            "Access-Control-Allow-Origin": "*"
        },
    })
    .then((res) =>  {console.log(res)})
    .catch((error) => {
        console.log(`ERROR: ${error}`);
    });

    return PUUID;
}



//euw1.api.riotgames.com/riot/account/v1/accounts/by-riot-id/psikoo/miau?api_key=RGAPI-1643052f-39b4-42c6-bdd1-26bae937d3e9