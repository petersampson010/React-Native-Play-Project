import { fetchAllUsers } from "./APIcalls";


export const validatePlayer = player => {
    if (player.name!==''&&player.price!==0) {
        return true;
    } else {
        return false;
    }
}

export const validateUser = (allUsers, allAdminUsers, user) => {
    let result = true;
    let error = ''
    let clubId = parseInt(user.clubId);
    let allAdminUserIds = allAdminUsers.map(x=>x.admin_user_id);
    if (allAdminUserIds.includes(clubId))  {
        allUsers.forEach(x => {
            if (x.email===user.email) {
                error = "email address already registered!";
                result = false;
            }
        })
    } else {
        error = 'Invalid Club ID';
        result = false;
    }
    return { result, error };
}