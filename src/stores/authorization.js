import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useAuthorization = defineStore('authorization', () => {
    const isAuthorized = ref(null);
    const isRegistered = ref(true);
    const isRegisterFailed = ref(false);
    const isLoginFailed = ref(false);

    const usersLocalStore = localStorage.getItem('users');
    const users = usersLocalStore ? JSON.parse(usersLocalStore) : [];


    const registrationUser = (login, password, name, lastName) => {
        const user = {
            login: login,
            password: password,
            name: name,
            lastName: lastName,
        };

        isRegisterFailed.value = users.some((user) => user.login === login || user.name === name);

        if (isRegisterFailed.value) {
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
        } else {
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
        }
    }

    const loginUser = (login, password) => {
        // let userLogin;
        // let userPassword;
        // const user = JSON.parse(localStorage.getItem('user'));

        const user = users.find((user) => user.login === login);

        if (user === undefined) {
            isLoginFailed.value = true;
            isAuthorized.value = false;
        } else {
            if (user.password === password) {
                isAuthorized.value = true;
            }
        }

        // try {
        //     userLogin = user.login;
        //     userPassword = user.password;
        //
        //     if (login === userLogin && password === userPassword) {
        //         isAuthorized.value = true;
        //     } else {
        //         isRegistered.value = false;
        //     }
        //
        // } catch (e) {
        //     localStorage.removeItem('user')
        //     return undefined
        // }
    }

    const userStore = JSON.parse(localStorage.getItem('user'));

    if (userStore) {
        loginUser(userStore.login, userStore.password);
    }

    return { isAuthorized, isRegistered, registrationUser, loginUser, isRegisterFailed, isLoginFailed }
})
