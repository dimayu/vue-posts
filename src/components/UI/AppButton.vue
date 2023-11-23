<template>
	<button class="btn">
		<slot></slot>
	</button>
</template>

<script setup>

</script>

<style lang="scss" scoped>
@import "../../assets/variables";

.btn {
	max-width: 200px;
	padding: 6px 12px;
	background-color: $light---neutral--700;
	color: $light---neutral--400;
	font-size: 16px;

	&:hover{
		background-color: $light---neutral--600;
	}

	&:disabled {
		opacity: .5;
	}
}

</style>