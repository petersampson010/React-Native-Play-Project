import { playersObjToArray } from "./functions/reusable";

const initialState = {
    endUser: {
        adminUser: {
            active: false,
            aUser: {},  
            allUsers: [],
        },
        user: {},
    },
    players: {
        clubPlayers: [],
        starters: [],
        subs: []
    },
    joiners: {
        puJoiners: [],
        pgJoiners: [],
        latestUG: null,
    },
    gameweek: {
        games: [],
        gwSelectId: null,
        gwLatest: null,
    },
    league: [],
    loginComplete: false,
}


const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGINUSER':
            // console.log(action.pgJoiners);
            return {...state, 
                user: action.user, 
                clubPlayers: action.clubPlayers, 
                starters: action.starters,
                subs: action.subs, 
                puJoiners: action.puJoiners,
                leauge: action.league,
                loginComplete: true,
                gwLatest: action.gameweek,
                pgJoiners: action.pgJoiners,
                latestUG: action.latestUG
            }
        case 'LOGINADMINUSER':
            // console.log(action.clubPlayers)
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
        case 'SETGWSELECTID':
            return {...state, gwSelectId: action.id}
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