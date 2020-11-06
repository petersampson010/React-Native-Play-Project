export const positionString = (num) => {
    switch(num) {
        case 1:
            return "Goalkeeper";
        case 2: 
            return "Defender";
        case 3: 
            return "Midfielder";
        case 4:
            return "Forward";
        default:
            return;
    }
}

export const playersArrayToObj = arr => {
    let obj = {
        1: [],
        2: [],
        3: [],
        4: []
    };
    for (let i=0;i<arr.length;i++) {
        obj[arr[i].position].push(arr[i]);
    }
    return obj;
}

export const playersObjToArray = obj => {
    return Object.entries(obj).flat(Infinity);
}

export const isCaptain = (player, puJoiners) => {
    let puJoiner = puJoiners.find(x=>x.player_id===player.player_id);
    if (puJoiner.captain) {
        return true;
    } else {
        return false;
    }
}

export const isVCaptain = (player, puJoiners) => {
    let puJoiner = puJoiners.find(x=>x.player_id===player.player_id);
    if (puJoiner.vice_captain) {
        return true;
    } else {
        return false;
    }
}