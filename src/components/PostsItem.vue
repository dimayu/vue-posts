<template>
	<router-link :to="{ name: 'post', params: { id: post.id }}" class="post">
		<h3 class="post__title">{{ post.title }}</h3>
		<p class="post__body">{{ post.body.split('', 100).join('').padEnd(104, '.') }}</p>
	</router-link>
</template>

<script setup>
const props = defineProps({
	post: {
		type: Object,
		required: true,
	}
});

</script>

<style lang="scss" scoped>
@import "../assets/variables";

.post {
	padding: 24px;
	text-decoration: none;
	color: $light---neutral--900;
	box-shadow: $cards_shadow;

	&:hover {
		box-shadow: none;
	}

	&__title {
		margin-bottom: 12px;
		font-size: 20px;

		&:first-letter {
			text-transform: capitalize;
		}
	}

	&__body {
		font-size: 18px;

		&:first-letter {
			text-transform: capitalize;
		}
	}
}
</style>