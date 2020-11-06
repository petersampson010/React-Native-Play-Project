// USER

export const fetchAllUsers = () => {
    return fetch('http://localhost:3000/users')
    .then(res=>res.json());
}
export const fetchUserById = id => {
    return fetch(`http://localhost:3000/users/${id}`)
    .then(res=>res.json())
}
export const fetchUserByEmail = userObj => {
    return fetchAllUsers()
    .then(users=>users.find(x=>x.email===userObj.email))
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

// ADMIN_USER

export const fetchAllAdminUsers = () => {
    return fetch('http://localhost:3000/admin_users')
    .then(res=>res.json());
}

export const fetchAdminUserById = id => {
    return fetch(`http://localhost:3000/admin_users/${id}`)
    .then(res=>res.json());
}
export const fetchAdminUserByEmail = aUser => {
    return fetchAllAdminUsers()
    .then(aUsers=>aUsers.find(x=>x.email===aUser.email))
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

//PLAYER

export const fetchAllPlayers = () => {
    return fetch('http://localhost:3000/players')
    .then(res => res.json())
}
export const fetchPlayerById = id => {
    return fetch(`http://localhost:3000/players/${id}`)
    .then(res => res.json())
}
export const fetchAllPlayersByAdminUserId = id => {
    return fetch(`http://localhost:3000/admin_users/${id}/players`)
    .then(res => res.json())
}
export const fetchStartersByUserId = id => {
    return fetch(`http://localhost:3000/users/${id}/team_start`)
    .then(res => res.json())
}
export const fetchSubsByUserId = id => {
    return fetch(`http://localhost:3000/users/${id}/team_sub`)
    .then(res => res.json())
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

//PLAYER_USER_JOINER

export const fetchAllPlayerUserJoinersByUserId = id => {
    return fetch(`http://localhost:3000/users/${id}/player_user_joiners`)
    .then(res=>res.json())
}
export const postPlayerUserJoiner = (player, userId, count) => {
    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            sub: count>5 ? true : false,
            captain: count===2 ? true : false,
            vice_captain: count===5 ? true : false,
            player_id: player.player_id,
            user_id: userId
        })
    };
    return fetch('http://localhost:3000/player_user_joiners', configObj)
    .then(res=>res.json())
}







