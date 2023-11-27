<template>
	<header class="header">
		<div class="wrapper">
			<div class="header__items">
				<router-link :to="{ name: 'home'}" class="header__items__item header__items__left">
					<h1 class="header__title">Posts</h1>
				</router-link>

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
						<AppButton
							@click="emit('openModal',); emit( 'setAddPost')"
						>
							Add Post
						</AppButton>
						<AppButton
							@click="emit('setIsExit')"
						>
							Exit
						</AppButton>
						<img src="/public/user.png" alt="user" width="512" height="512">
					</template>
				</div>
			</div>
		</div>
	</header>
</template>

<script setup>
import { AppButton } from "./";

const props = defineProps({
	isAuthorized: {
		type: Boolean,
		required: true,
	}
});

const emit = defineEmits([
	'openModal',
	'setLogin',
	'setRegister',
	'setAddPost',
	'setIsExit'
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

	&__items {
		display: flex;
		align-items: center;
		justify-content: space-between;

		.btn {
			margin-left: 24px;
		}

		&__left {
			text-decoration: none;

			h1 {
				font-size: 24px;
				font-weight: 600;
				color: $light---primary--600;
			}

			&:hover {
				h1 {
					color: $light---primary--400;
				}
			}
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
				width: 80px;
				height: 80px;
				border-radius: 50%;
			}
		}
	}
}
</style>