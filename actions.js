export const login = user => {
    console.log("login: " + user);
    return {
        type: 'LOGIN',
        user
    }
}

export const reverseHomeScreenMenuVisibility = () => {
    return {
        type: 'REVERSEHOMESCREENMENUVISIBILITY'
    }
}

export const addAdminUser = aUser => {
    return {
        type: 'ADDADMINUSER',
        aUser
    }
}