import {RestRequest} from "./requestService";
import {endPoints} from "../constant/endPoints";

const getUserFromStorage = () => {
    let userName = localStorage.getItem('User name');
    let userSurname = localStorage.getItem('User surname');
    let userEmail = localStorage.getItem('User email');
    let userID = localStorage.getItem('User id');
    if (!userName && !userSurname && !userEmail && !userID) return null;

    let user = {
        name: userName,
        surname: userSurname,
        email: userEmail,
        id: userID
    };
    return user;
};

const storeUser = (currentUser) => {
    localStorage.setItem('User name', currentUser.name);
    localStorage.setItem('User surname', currentUser.surname);
    localStorage.setItem('User email', currentUser.email);
    localStorage.setItem('User id', currentUser.id);
}

const afterLogin = response => {
    if (response.data.registratedUser) {
        storeUser(response.data.registratedUser);
    }

    if (response.data.signedInUser) {
        storeUser(response.data.signedInUser);
    }
    return response;
};
const registration = (name, surname, email, password) =>
    RestRequest.post(endPoints.registration, {}, {name, surname, email, password})
        .then(afterLogin);

const login = (email, password) =>
    RestRequest.post(endPoints.login, {}, {email, password})
        .then(afterLogin);

const logout = () => {
    localStorage.removeItem('User name');
    localStorage.removeItem('User surname');
    localStorage.removeItem('User email');
    localStorage.removeItem('User id');
};
export default {
    login,
    getUserFromStorage,
    registration,
    logout
}
