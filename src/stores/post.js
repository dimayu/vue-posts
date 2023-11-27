import { defineStore } from 'pinia';

const baseUrl = "https://jsonplaceholder.typicode.com/";
export const usePost = defineStore("post", {
    state: () => ({
        isLoading: false,
        isError: false,
        post: null,
    }),
    actions: {
        async fetchPost(id) {
            try {
                this.isLoading = true;

                const response = await fetch(`${baseUrl}posts/${id}`);
                const data = await response.json();

                this.post = data;
                this.isLoading = false;

            } catch (e) {
                this.isError = true;
                console.log(e);
            }
        },

        async fetchGetPost(title, body) {
            try {
                await fetch(`${baseUrl}posts`, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                    body: JSON.stringify({
                        title: title,
                        body: body,
                    })
                });

            } catch (e) {
                this.isError = true;
                console.log(e);
            }
        }
    },
});

