const initialState = {
    admin: false,
    user: {},
    aUser: {},
    homeScreenMenuVisibility: false,
    aUser: {},
    clubPlayers: [],
    menu: false,
}


const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            if (action.user.user_id===undefined) {
                return {...this.state, aUser: action.user, admin: true}
            } else {
                return {...state, user: action.user};
            }
        case 'REVERSEMENU':
            return {...state, menu: !state.menu}
        case 'SETADMINUSER':
            return {...state, aUser: action.aUser}
        case 'SETCLUBPLAYERS':
            return {...state, clubPlayers: action.players}
        case 'SETUSER':
            return {...state, user: action.user}
        default:
            return state;
    }
}

export default rootReducer;