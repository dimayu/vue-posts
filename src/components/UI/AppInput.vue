<template>
	<input type="text"
				 class="input"
				 :value="modelValue"
				 @input="updateModelValue"
	/>
</template>

<script setup>
const props = defineProps({
	modelValue: {
		type: String,
	},
})

const emit = defineEmits([
	'update:modelValue',
]);

const updateModelValue = (event) => {
	emit('update:modelValue', event.target.value)
}
</script>

<style lang="scss" scoped>
@import "../../assets/variables";

.input {
	padding: 6px 12px;
	border: 1px solid $light---neutral--700;
	font-size: 16px;

	&:focus {
		outline: none;
		border-color: $light---neutral--600;
	}
}

</style>