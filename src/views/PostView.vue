<template>
  <main>
    <div class="wrapper">
			<div class="post" v-if="!postStore.isLoading && !postStore.isError">
				<h2 class="post__title">{{ postStore.post.title }}</h2>
				<p class="post__body">{{ postStore.post.body }}</p>
				<div class="post__footer">
					<p class="post__footer__left">{{ date }}</p>
					<router-link router-link :to="{ name: 'user', params: { id: userStore.user.id }}"
											 class="post__footer__right">
						{{ userStore.user.name }}
					</router-link>
				</div>

				<div class="post__comments">
					<p class="post__comments__title">Comments:</p>
						<PostCommets v-for="comment in commentsStore.comments" :comment="comment"/>
				</div>
			</div>

			<Loader v-if="postStore.isLoading && !postStore.isError"/>

			<h4 v-if="postStore.isLoading && postStore.isError">
				Server Error
			</h4>
		</div>
  </main>
</template>

<script setup>
import { computed, watch, watchEffect } from "vue";
import { useRoute } from "vue-router";

import { usePost } from "../stores/post";
import { useUser } from "../stores/user";
import { useComments } from "../stores/coments";

import { Loader, PostCommets } from "../components";

const route = useRoute();
const postStore = usePost();
const userStore = useUser();
const commentsStore = useComments();

const postId = computed(() => route.params.id);
const userId = computed(() => postStore.post?.userId);

watchEffect(
	async () => {
		await postStore.fetchPost(postId.value);
		await commentsStore.fetchComments(postId.value);

		if (userId.value) {
			await userStore.fetchUser(userId.value);
		}
	},
);


const date = (new Date(Date.now())).toISOString().substring(0, 10);

</script>

<style lang="scss" scoped>
@import "../assets/variables";

.post {
	padding: 24px;
	box-shadow: $cards_shadow;

	&__title {
		margin-bottom: 12px;
		font-size: 24px;

		&:first-letter {
			text-transform: capitalize;
		}
	}

	&__body {
		font-size: 20px;

		&:first-letter {
			text-transform: capitalize;
		}
	}

	&__footer {
		display: flex;
		justify-content: space-between;
		margin-top: 12px;
		font-style: italic;
		font-size: 18px;
		text-align: right;
		text-transform: capitalize;

		a {
			color: $light---primary--400;
			text-decoration: none;

			&:hover {
				color: $light---primary--600;
			}
		}
	}

	&__comments {
		padding: 24px;
		margin-top: 16px;

		&__title {
			margin-bottom: 12px;
			font-size: 20px;
		}
	}
}
</style>
