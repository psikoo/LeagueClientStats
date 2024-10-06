export function resolveServerURL(serverName) {
    switch (serverName) {
        case "BR":
            return "br1.api.riotgames.com";
        case "EUNE":
            return "eun1.api.riotgames.com";
        case "EUW":
            return "euw1.api.riotgames.com";
        case "JP":
            return "jp1.api.riotgames.com";
        case "KR":
            return "kr.api.riotgames.com";
        case "LAN":
            return "la1.api.riotgames.com";
        case "LAS":
            return "la2.api.riotgames.com";
        case "NA":
            return "na1.api.riotgames.com";
        case "OCE":
            return "oc1.api.riotgames.com";
        case "TR":
            return "tr1.api.riotgames.com";
        case "RU":
            return "ru.api.riotgames.com";
        
        default:
            console.log(`${serverName} is an unexpected server name`);
    }
}

export function resolveRegionURL(serverName) {
    switch (serverName) {
        case "BR":
        case "LAN":
        case "LAS":
        case "NA":
            return "americas.api.riotgames.com";
        case "JP":
        case "KR":
            return "asia.api.riotgames.com";
        case "EUNE":
        case "EUW":
        case "RU":
        case "TR":
            return "europe.api.riotgames.com";
        case "OCE":
            return "sea.api.riotgames.com";
        
        default:
            console.log(`${serverName} is an unexpected server name`);
    }
}