<template>
	<transition name="modal-fade">
		<div class="modal-backdrop" @click.stop="$emit('closeModal')">
			<div
				@click.stop
				class="modal">
				<header
					class="modal__header">
					<slot name="header">
					</slot>
					<AppButton
						@click="$emit('closeModal')"
					>
						x
					</AppButton>
				</header>
				<section class="modal__body">
					<slot name="body">
					</slot>
				</section>
			</div>
		</div>
	</transition>
</template>

<script setup>
import AppButton from "./AppButton.vue";
</script>

<style lang="scss">
.modal-backdrop {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: rgba(0, 0, 0, 0.3);
	display: flex;
	justify-content: center;
	align-items: center;
}

.modal {
	background: #FFFFFF;
	box-shadow: 2px 2px 20px 1px;
	overflow-x: auto;
	display: flex;
	flex-direction: column;

	&__header {
		position: relative;
		min-width: 300px;
		padding: 15px;
		display: flex;
		border-bottom: 1px solid #eeeeee;
		color: #4AAE9B;
		justify-content: space-between;
		align-items: center;
	}

	&__body {
		position: relative;
		padding: 20px 10px;
	}
}

.modal-fade-enter,
.modal-fade-leave-to {
	opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
	transition: opacity .5s ease;
}
</style>