import axios from "axios";
import { UserCredentials } from "../store/userCredentials";

export const userService = {
    login,
    getUserProjects
};


async function login(userCred: UserCredentials) {
    console.log('login in service');

    const res = await axios.post('https://private-052d6-testapi4528.apiary-mock.com/authenticate', userCred);
    console.log(res);
    const user = res.data[0]
    if (res) {
        _saveLocalUser(user);
        return user;
    }
}
function _saveLocalUser(user: any) {
    sessionStorage.setItem('loggedinUser', JSON.stringify(user));
    return user;
}

async function getUserProjects() {
    console.log('proj in service');
    const userToken = getLoggedinUser()
    console.log(userToken);
    const res = await axios.get('https://private-052d6-testapi4528.apiary-mock.com/info',{ headers: { 'Authorization': `Bearer ${userToken}` } });
    console.log(res.data);
    return res.data
}
function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem('loggedinUser') || '{}');
}
