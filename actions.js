import { isCaptain, isVCaptain } from "./functions/reusable"

export const loginUser = (user, clubPlayers, starters, subs, puJoiners) => {
    let captain, vCaptain;
    for (let i=0;i<starters.length;i++) {
        if (isCaptain(starters[i], puJoiners)) {
            captain = starters[i];
        } else if (isVCaptain(starters[i], puJoiners)) {
            vCapain = starters[i];
        }
    }
    return {
        type: 'LOGINUSER',
        user,
        clubPlayers, 
        starters, 
        subs,
        puJoiners,
        captain,
        vCaptain
    }
}

export const setAdminUser = aUser => {
    return {
        type: 'SETADMINUSER',
        aUser
    }
}

export const setClubPlayers = players => {
    return {
        type: 'SETCLUBPLAYERS',
        players
    }
}

export const setUser = user => {
    return {
        type: 'SETUSER',
        user
    }
}

export const setTeamPlayers = players => {
    return {
        type: 'SETTEAMPLAYERS',
        players
    }
}

export const addSub = player => {
    return {
        type: 'ADDSUB',
        player
    }
}

export const addStarter = player => {
    return {
        type: 'ADDSTARTER',
        player
    }
}

export const pickTeamUpdate = (team, subs) => {
    return {
        type: 'PICKTEAMUPDATE',
        team,
        subs
    }
}

export const resetTeamPlayers = () => {
    return {
        type: 'RESETTEAMPLAYERS'
    }
}

export const nts2Login = (user, starters, subs, puJoiners) => {
    return {
        type: 'NTS2LOGIN',
        user,
        starters, 
        subs,
        puJoiners
    }
}