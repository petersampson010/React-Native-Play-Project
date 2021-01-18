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
        topPlayer: null,
        topUser: null
    },
    loginComplete: false,
}


const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGINUSER':
            console.log(action.ugJoiners);
            return {
                ...state, 
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
            };
        case 'LOGINADMINUSER':
            return {
                ...state, 
                endUser: {
                    ...state.endUser,
                    adminUser: {
                        ...state.endUser.adminUser,
                        aUser: action.aUser,
                        allUsers: action.allUsers
                    }
                },
                players: {
                    ...state.players,
                    clubPlayers: action.clubPlayers
                },
                gameweek: {
                    ...state.gameweek,
                    games: action.games,
                },
                loginComplete: true
            };
        case 'NTS2LOGIN':
            return {
                ...state,
                endUser: {
                    ...state.endUser,
                    user: action.user
                },
                players: {
                    ...state.players,
                    starters: action.starters,
                    subs: action.subs
                },
                joiners: {
                    ...state.joiners,
                    puJoiners: action.puJoiners
                }
            };
        case 'SETADMINUSER':
            console.log('HHHIIITTTT here blud');
            console.log(action.aUser);
            return {
                ...state, 
                endUser: {
                    ...state.endUser,
                    adminUser: {
                        ...state.endUser.adminUser,
                        aUser: action.aUser
                    }
                }
            };
        case 'SETCLUBPLAYERS':
            return {
                ...state, 
                players: {
                    ...state.players,
                    clubPlayers: action.players
                }
            };
        case 'SETUSER':
            return {
                ...state, 
                endUser: {
                    ...state.endUser, 
                    user: action.user
                }
            };
        case 'RESETTEAMPLAYERS':
            return {
                ...state, 
                players: {
                    ...state.players,
                    starters: [], 
                    subs: []
                }
            };
        case 'PICKTEAMUPDATE':
            return {
                ...state, 
                players: {
                    ...state.players,
                    starters: playersObjToArray(action.team), 
                    subs: action.subs
                }
            };
        case 'SETGWSELECTID':
            return {
                ...state, 
                gameweek: {
                    ...state.gameweek,
                    gwSelectId: action.id
                }
            };
        case 'COMPLETEGAME':
            let newGames = state.gameweek.games.map(game=>{
                if (game.gameweek_id===action.id) {
                    return {...game, complete: true};
                } else {
                    return game;
                }
            });
            return {
                ...state, 
                gameweek: {
                    ...state.gameweek,
                    games: newGames
                }
            };
        case 'ADDGAME':
            return {
                ...state, 
                gameweek: {
                    ...state.gameweek,
                    games: [...state.gameweek.games, action.game]
                }
            };
        default:
            return state;
    }
}

export default rootReducer;