import { defineStore } from 'pinia';

const baseUrl = "https://jsonplaceholder.typicode.com/";
export const useComments = defineStore("comments", {
    state: () => ({
        isLoading: false,
        isError: false,
        comments: [],
    }),
    actions: {
        async fetchComments(id) {
            try {
                this.isLoading = true;

                const response = await fetch(`${baseUrl}comments?postId=${id}`);
                const data = await response.json();

                this.comments = data;
                this.isLoading = false;

            } catch (e) {
                this.isError = true;
                console.log(e);
            }
        }
    },
});

