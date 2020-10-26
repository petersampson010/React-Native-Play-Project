const initialState = {
    user: {},
    homeScreenMenuVisibility: false,
    aUser: {}
}


const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {...state, user: action.user};
        case 'REVERSEHOMESCREENMENUVISIBILITY':
            return {...state, homeScreenMenuVisibility: !state.homeScreenMenuVisibility}
        case 'ADDADMINUSER':
            return {...state, aUser: action.aUser}
        default:
            return state;
    }
}

export default rootReducer;