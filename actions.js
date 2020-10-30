export const login = user => {
    return {
        type: 'LOGIN',
        user
    }
}

export const reverseMenu = () => {
    return {
        type: 'REVERSEMENU'
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