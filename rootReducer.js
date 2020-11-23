import { playersObjToArray } from "./functions/reusable";

const initialState = {
    admin: false,
    user: {},
    aUser: {},
    clubPlayers: [],
    starters: [],
    subs: [],
    puJoiners: [],
    loginComplete: false
}


const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGINUSER':
            return {...state, 
                user: action.user, 
                clubPlayers: action.clubPlayers, 
                starters: action.starters,
                subs: action.subs, 
                puJoiners: action.puJoiners,
                loginComplete: true
            }
        case 'NTS2LOGIN':
            return {...state,
                user: action.user,
                starters: action.starters,
                subs: action.subs,
                puJoiners: action.puJoiners
            }
        case 'LOGINADMINUSER':
            return;
        case 'SETADMINUSER':
            return {...state, aUser: action.aUser};
        case 'SETCLUBPLAYERS':
            return {...state, clubPlayers: action.players};
        case 'SETUSER':
            return {...state, user: action.user};
        case 'RESETTEAMPLAYERS':
            return {...state, starters: [], subs: []};
        case 'PICKTEAMUPDATE':
            return {...state, starters: playersObjToArray(action.team), subs: action.subs}
        default:
            return state;
    }
}

export default rootReducer;