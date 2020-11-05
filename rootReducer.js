const initialState = {
    admin: false,
    user: {},
    aUser: {},
    clubPlayers: [],
    teamPlayers: []
}


const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            if (action.user.user_id===undefined) {
                return {...this.state, aUser: action.user, admin: true}
            } else {
                return {...state, user: action.user};
            }
        case 'SETADMINUSER':
            return {...state, aUser: action.aUser}
        case 'SETCLUBPLAYERS':
            return {...state, clubPlayers: action.players}
        case 'SETUSER':
            return {...state, user: action.user}
        case 'ADDTEAMPLAYER':
            return {...state, teamPlayers: [...state.teamPlayers, action.player]}
        default:
            return state;
    }
}

export default rootReducer;