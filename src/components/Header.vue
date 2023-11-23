<template>
	<header class="header">
		<div class="wrapper">
			<div class="header__items">
				<div class="header__items__item header__items__left">
					<h1 class="header__title">Posts</h1>
				</div>

				<div class="header__items__item header__items__right">
					<template v-if="!props.isAuthorized">
						<AppButton
							@click="emit('openModal',); emit( 'setLogin')"
						>
							Login
						</AppButton>
						<AppButton
							@click="emit('openModal',); emit( 'setRegister')"
						>
							Register
						</AppButton>
					</template>

					<template v-else>
						<AppInput placeholder="Search posts by title"/>
						<img src="/public/user.png" alt="user" width="512" height="512">
					</template>
				</div>
			</div>
		</div>
	</header>
</template>

<script setup>
import { AppInput, AppButton } from "./";

const props = defineProps({
	isAuthorized: {
		type: Boolean,
		required: true,
	}
});

const emit = defineEmits([
	'openModal',
	'setLogin',
	'setRegister'
]);

</script>

<style lang="scss" scoped>
@import "../assets/variables";

.header{
	padding: 32px 0;
	margin-bottom: 48px;
	background-color: $light---neutral--300;
	border-top: 1px solid $light---primary--500;
	border-bottom: 1px solid $light---primary--500;

	&__title {
		font-size: 24px;
		font-weight: 600;
		color: $light---primary--600;
	}

	&__items {
		display: flex;
		align-items: center;
		justify-content: space-between;

		.btn {
			margin-left: 24px;
		}

		&__right {
			display: flex;
			align-items: center;
			gap: 24px;

			.input {
				width: 300px;
				max-width: 300px;
			}

			img {
				width: 150px;
				height: 150px;
				border-radius: 50%;
			}
		}
	}
}
</style>