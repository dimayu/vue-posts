<template>
  <main>
    <div class="wrapper">
			<div class="posts" v-if="!postsStore.isLoading && !postsStore.isError">
				<AppInput
					v-model="searchQuery"
					placeholder="Search posts by title"
				/>

				<PostsItem
					v-for="postItem in sortedAndSearchedProducts"
					:post="postItem"
					:key="postItem.id"
				/>
			</div>

			<Pagination
				v-if="!postsStore.isLoading && !postsStore.isError"
				:buttons="amountPaginationButton"
				:currentPage="currentPage"
				@fetchNextPage="fetchNextPage"
			/>

			<Loader v-if="postsStore.isLoading && !postsStore.isError"/>

			<h4 v-if="postsStore.isLoading && postsStore.isError">
				Server Error
			</h4>
		</div>
  </main>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { usePosts } from "../stores/posts";

import { PostsItem, Loader, Pagination, AppInput } from "../components";

const postsStore = usePosts();
const posts = postsStore.posts;

//Search
const searchQuery = ref('');

//Pagination
const amountPages = 100;
const limitPosts = 10;
const amountPaginationButton = amountPages / limitPosts;
const currentPage = ref(1);

const fetchNextPage = (page) => {
	currentPage.value = page;
};

watch(
	currentPage,
	async () => {
		await postsStore.fetchPosts(currentPage.value, limitPosts);
	},
	{ immediate: true }
);

const sortedAndSearchedProducts = computed(() => {
	return postsStore.posts.filter(post => post.title.toLowerCase().includes(searchQuery.value.toLowerCase()))
});

</script>

<style lang="scss" scoped>
@import "../assets/variables";

.posts {
	display: flex;
	flex-direction: column;
	gap: 32px;
}

.list-enter-active,
.list-leave-active {
	transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
	opacity: 0;
	transform: translateX(30px);
}

h4 {
	text-align: center;
	font-size: 34px;
	color: $alerts---error--500;
}
</style>
