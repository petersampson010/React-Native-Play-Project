const initialState = {
    user: {}
}


const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            console.log(action.user)
            return {...state, user: action.user};
        default:
            return state;
    }
}

export default rootReducer;