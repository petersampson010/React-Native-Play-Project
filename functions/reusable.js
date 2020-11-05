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

export const teamPlayersArrayToObj = (teamPlayersArr) => {
    let obj = {
        1: [],
        2: [],
        3: [],
        4: []
    };
    for (let i=0;i<teamPlayersArr.length;i++) {
        obj[teamPlayersArr[i].position].push(teamPlayersArr[i]);
    }
    return obj;
}