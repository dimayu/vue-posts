import { defineStore } from 'pinia';

const baseUrl = "https://jsonplaceholder.typicode.com/";
export const usePosts = defineStore("posts", {
    state: () => ({
        isLoading: false,
        isError: false,
        posts: [],
    }),
    actions: {
        async fetchPosts(page, limit) {
            try {
                this.isLoading = true;

                const response = await fetch(`${baseUrl}posts?_page=${page}&_limit=${limit}`);
                const data = await response.json();

                this.posts = data;
                this.isLoading = false;

            } catch (e) {
                this.isError = true;
                console.log(e);
            }
        },
    },
});

