import { showMessage } from "react-native-flash-message";
import { fetchAllUsers } from "./APIcalls";
import { playersObjToArray } from "./reusable";


export const validatePlayer = player => {
    if (player.name!==''&&player.price!==0) {
        return true;
    } else {
        return false;
    }
}

export const validateUser = (allUsers, aUser, user) => {
    let result = true;
    if (aUser.admin_user_id) {
        allUsers.forEach(x => {
            if (x.email===user.email) {
                showMessage({
                    message: "Email address already in use",
                    type: "danger"
                });
                result = false;
            }
        })
    } else {
        showMessage({
            message: "Invalid club ID",
            type: "danger"
        })
        result = false;
    }
    return result;
}

export const validatePickTeam = (team) => {
    if (playersObjToArray(team).length===6) {
        return true;
    } else {
        showMessage({
            message: "You need 7 strating players",
            type: "danger"
        });
        return false;
    }
}