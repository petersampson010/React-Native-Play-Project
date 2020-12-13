import { playersObjToArray } from "./functions/reusable";

const initialState = {
    admin: false,
    user: {},
    aUser: {},
    clubPlayers: [],
    starters: [],
    subs: [],
    puJoiners: [],
    allUsers: [],
    games: [],
    league: [],
    loginComplete: false,
    gameweekId: null,
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
                leauge: action.league,
                loginComplete: true
            }
        case 'LOGINADMINUSER':
            return {...state, 
                aUser: action.aUser, 
                clubPlayers: action.clubPlayers,
                allUsers: action.allUsers,
                games: action.games,
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
        case 'SETGAMEWEEKID':
            return {...state, gameweekId: action.id}
        case 'COMPLETEGAME':
            let newGames = state.games.map(game=>{
                if (game.gameweek_id===action.id) {
                    return {...game, complete: true};
                } else {
                    return game;
                }
            });
            return {...state, games: newGames};
        case 'ADDGAME':
            return {...state, games: [...state.games, action.game]};
        default:
            return state;
    }
}

export default rootReducer;