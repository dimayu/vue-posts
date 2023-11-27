<template>
	<div class="comment">
		<div class="comment__item">
			<span>Name:</span>
			<span>{{ comment.name }}</span>
		</div>
		<div class="comment__item">
			<span>Email:</span>
			<span>{{ comment.email }}</span>
		</div>
		<p>{{ comment.body }}</p>
	</div>
</template>

<script setup>
const props = defineProps({
	comment: {
		type: Object,
		required: true,
	}
});

</script>

<style lang="scss" scoped>
@import "../assets/variables";

.comment{
	margin-bottom: 18px;
	padding-top: 12px;
	border-top: 1px solid $light---neutral--500;
	font-size: 18px;

	&__item {
		margin-bottom: 8px;

		span {
			margin-right: 12px;

			&:nth-child(1) {
				color: $light---neutral--500;
			}
		}
	}

	p:first-letter {
		text-transform: capitalize;
	}
}
</style>