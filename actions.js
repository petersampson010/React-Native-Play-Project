export const loginUser = (user, clubPlayers, starters, subs, puJoiners) => {
    return {
        type: 'LOGINUSER',
        user,
        clubPlayers, 
        starters, 
        subs,
        puJoiners
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

export const updateTeam = (team, subs) => {
    return {
        type: 'UPDATETEAM',
        team,
        subs
    }
}

export const resetTeamPlayers = () => {
    return {
        type: 'RESETTEAMPLAYERS'
    }
}