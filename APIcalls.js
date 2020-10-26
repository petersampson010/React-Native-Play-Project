export const fetchAllUsers = () => {
    return fetch('http://localhost:3000/users')
    .then(res=>res.json());
}

export const fetchUser = userObj => {
    return fetchAllUsers()
    .then(users=>users.find(x=>x.username===userObj.email))
}

export const fetchAllAdminUsers = () => {
    return fetch('http://localhost:3000/admin_users')
    .then(res=>res.json());
}

export const fetchAdminUser = aUserObj => {
    return fetchAllAdminUsers()
    .then(aUsers=>aUsers.find(x=>x.username===aUserObj.email))
}

export const postAdminUser = aUser => {
    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            username: aUser.email,
            password: aUser.password,
            club_name: aUser.clubName
        })
    };
    return fetch('http://localhost:3000/admin_users', configObj)
    .then(res=>res.json())
}

export const postPlayer = (player, aUserId) => {
    console.log(typeof player.price);
    console.log(typeof aUserId);
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