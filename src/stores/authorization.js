import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useAuthorization = defineStore('authorization', () => {
    const isAuthorized = ref(false);
    const isRegistered = ref(true);

    const user = {
        login: "",
        password: "",
        name: "",
        lastName: "",
    };


    const registrationUser = (login, password, name, lastName) => {
        user.login = login;
        user.password = password;
        user.name = name;
        user.lastName = lastName;

        localStorage.setItem('user', JSON.stringify(user));
    }

    const loginUser = (login, password) => {
        let userLogin;
        let userPassword;
        const user = JSON.parse(localStorage.getItem('user'));

        if (user === null) {
            isRegistered.value = false;
            return undefined
        }

        try {
            userLogin = user.login;
            userPassword = user.password;

            if (login === userLogin && password === userPassword) {
                isAuthorized.value = true;
            } else {
                isRegistered.value = false;
            }

        } catch (e) {
            localStorage.removeItem('user')
            return undefined
        }
    }

    const userStore = JSON.parse(localStorage.getItem('user'));

    if (userStore) {
        loginUser(userStore.login, userStore.password);
    }

    return { isAuthorized, isRegistered, registrationUser, loginUser }
})
