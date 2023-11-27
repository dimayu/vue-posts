import {defineStore} from 'pinia';

const baseUrl = "https://jsonplaceholder.typicode.com/";
export const useUser = defineStore("user", {
    state: () => ({
        isLoading: false,
        isError: false,
        user: [],
    }),
    actions: {
        async fetchUser(id) {
            try {
                this.isLoading = true;

                const response = await fetch(`${baseUrl}users/${id}`);
                const data = await response.json();

                this.user = data;
                this.isLoading = false;

            } catch (e) {
                this.isError = true;
                console.log(e);
            }
        }
    },
});

