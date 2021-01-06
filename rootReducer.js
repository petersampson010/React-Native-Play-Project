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
    homeGraphics: {
        league: [],
        topPlayer: {},
        topUser: {}
    },
    loginComplete: false,
}


const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGINUSER':
            console.log(action.ugJoiners);
            return {...state, 
                endUser: {
                    ...state.endUser,
                    user: action.user,
                },
                players: {
                    clubPlayers: action.clubPlayers, 
                    starters: action.starters,
                    subs: action.subs, 
                },
                joiners: {
                    puJoiners: action.puJoiners,
                    pgJoiners: action.pgJoiners,
                    ugJoiners: action.ugJoiners,
                    latestUG: action.latestUG,
                },
                gameweek: {
                    ...state.gameweeks,
                    gwLatest: action.gameweek,
                },
                homeGraphics: {
                    league: action.league,
                    topPlayer: action.topPlayer,
                    topUser: action.topUser
                },
                loginComplete: true,
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