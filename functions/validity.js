import { fetchAllUsers } from "./APIcalls";


export const validatePlayer = player => {
    if (player.name!==''&&player.price!==0) {
        return true;
    } else {
        return false;
    }
}

export const validateUser = (allUsers, allAdminUsers, user) => {
    let clubId = parseInt(user.clubId);
    let allAdminUserIds = allAdminUsers.map(x=>x.admin_user_id);
    if (allAdminUserIds.includes(clubId))  {
        allUsers.forEach(x => {
            if (x.username===user.email) {
                console.log("email address already registered!")
                return false;
            }
        })
        return true;
    } else {
        console.log('Invalid Club ID');
        return false;
    }
}