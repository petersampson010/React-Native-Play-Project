export const fetchAllUsers = () => {
    return fetch('http://localhost:3000/users')
    .then(res=>res.json());
}
export const fetchAllAdminUsers = () => {
    return fetch('http://localhost:3000/admin_users')
    .then(res=>res.json());
}
export const fetchAllPlayers = () => {
    return fetch('http://localhost:3000/players')
    .then(res => res.json())
}
export const fetchAllPlayersOfAdminUser = id => {
    return fetch('http://localhost:3000/players')
    .then(res => res.json())
    .then(data => data.filter(x=>x.admin_user_id===id))
}

export const fetchAllPlayerUserJoinersOfUser = id => {
    return fetch('http://localhost:3000/player_user_joiners')
    .then(res => res.json())
    .then(data => data.filter(x=>x.user_id===id))
}



export const fetchUser = userObj => {
    return fetchAllUsers()
    .then(users=>users.find(x=>x.email===userObj.email))
}
export const fetchAdminUser = aUserObj => {
    return fetchAllAdminUsers()
    .then(aUsers=>aUsers.find(x=>x.email===aUserObj.email))
}

export const fetchAdminUserById = id => {
    return fetchAllAdminUsers()
    .then(aUsers => aUsers.find(x=>x.admin_user_id===id))
}

export const fetchPlayerFromId = id => {
    return fetchAllPlayers()
    .then(players => players.find(x=>x.player_id===id))
}


export const postAdminUser = aUser => {
    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            email: aUser.email,
            password: aUser.password,
            club_name: aUser.email
        })
    };
    return fetch('http://localhost:3000/admin_users', configObj)
    .then(res=>res.json())
}
export const postPlayer = (player, aUserId) => {
        let configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                first_name: player.name.split(' ')[0],
                last_name: player.name.split(' ')[1],
                position: player.position,
                price: parseInt(player.price),
                availability: 'a',
                admin_user_id: aUserId
            })
        };
        return fetch('http://localhost:3000/players', configObj)
        .then(res=>res.json())
}
export const postUser = (userObj) => {
    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            email: userObj.email,
            teamname: userObj.teamName,
            password: userObj.password,
            transfers: 0,
            admin_user_id: userObj.clubId
        })
    };
    return fetch('http://localhost:3000/users', configObj)
    .then(res=>res.json())
}

export const postPlayerUserJoiner = (player, userId) => {
    console.log(player);
    console.log(userId);
    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            sub: false,
            captain: false,
            vice_captain: false,
            player_id: player.player_id,
            user_id: userId
        })
    };
    return fetch('http://localhost:3000/player_user_joiners', configObj)
    .then(res=>res.json())
}