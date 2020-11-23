export const positionString = (num) => {
    switch(num) {
        case '1':
            return "Goalkeeper";
        case '2': 
            return "Defender";
        case '3': 
            return "Midfielder";
        case '4':
            return "Forward";
        default:
            return;
    }
}

export const capitalize = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const fullName = player => {
    if (player) {
        return capitalize(player.first_name) + ' ' + capitalize(player.last_name)
    } else {
        return player
    }
}

export const playersArrayToObj = arr => {
    let obj = {
        '1': [],
        '2': [],
        '3': [],
        '4': []
    };
    for (let i=0;i<arr.length;i++) {
        obj[arr[i].position].push(arr[i]);
    }
    return obj;
}

export const playersObjToArray = obj => {
    return Object.values(obj).flat(Infinity);
}

export const getCaptain = (players, puJoiners) => {
    let playerId = puJoiners.find(x=>x.captain===true).player_id;
    let player = players.find(x=>x.player_id===playerId);
    return player;
}

export const getVCaptain = (players, puJoiners) => {
    let playerId = puJoiners.find(x=>x.vice_captain===true).player_id;
    let player = players.find(x=>x.player_id===playerId);
    return player;
}

export const isCaptain = (player, puJoiners) => {
    let puJoiner = puJoiners.find(x=>x.player_id===player.player_id);
    return puJoiner.captain;
}

export const isVCaptain = (player, puJoiners) => {
    let puJoiner = puJoiners.find(x=>x.player_id===player.player_id);
    return puJoiner.vice_captain;
}

export const getPuId = (player, puJoiners) => {
    let puJoiner = puJoiners.find(x=>x.player_id===player.player_id);
    return puJoiner.pu_id;
}

export const allSelectedPlayers = team => Object.values(team).flat(Infinity);

export const allSelectedPlayerIds = team => allSelectedPlayers(team).map(x=>x.player_id);