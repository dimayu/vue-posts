<template>
	<div class="pagination-container">
		<ul class="pagination">
			<li
				v-for="item in buttons"
				:key="item"
				@click="emit('fetchNextPage', item)"
				class="pagination__item"
				:class="{active: item === currentPage }"
			>{{ item }}</li>
		</ul>
	</div>
</template>

<script setup>
const props = defineProps({
	buttons: {
		type: Number,
		required: true,
	},
	currentPage: {
		type: Number,
		required: true
	}
});

const emit = defineEmits([
	'fetchNextPage'
]);
</script>

<style lang="scss" scoped>
@import "../assets/variables";

.pagination {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8px;

	&__item {
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		border: 1px solid $light---neutral--300;
		background-color: $light---neutral--100;
		font-size: 14px;
		font-weight: 400;
		line-height: 18px;
		color: $light---neutral--800;
		cursor: pointer;
		box-sizing: border-box;

		&.active,
		&:hover {
			border: 1px solid $light---primary--600;
			background-color: $light---primary--600;
			color: $light---neutral--100;
		}
	}

	&-container {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		margin-top: 48px;

		.next,
		.prev {
			width: 40px;
			height: 40px;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 50%;
			border: 1px solid $light---neutral--300;
			background-color: $light---neutral--100;
			font-size: 14px;
			font-weight: 400;
			line-height: 18px;
			color: $light---neutral--800;
			cursor: pointer;
			box-sizing: border-box;
			text-decoration: none;

			&:hover {
				border: 1px solid $light---primary--600;
				background-color: $light---primary--600;
				color: $light---neutral--100;
			}

			&:disabled {
				opacity: 0.3;
			}
		}
	}
}
</style>