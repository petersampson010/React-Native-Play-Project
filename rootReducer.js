const initialState = {
    user: {},
    homeScreenMenuVisibility: false
}


const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {...state, user: action.user};
        case 'REVERSEHOMESCREENMENUVISIBILITY':
            console.log({...state, homeScreenMenuVisibility: !state.homeScreenMenuVisibility})
            return {...state, homeScreenMenuVisibility: !state.homeScreenMenuVisibility}
        default:
            return state;
    }
}

export default rootReducer;