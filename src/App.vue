<template>
  <Header
		:isAuthorized="authorizationStore.isAuthorized"
		@openModal="openModal"
		@setLogin="setLogin"
		@setRegister="setRegister"
	/>

	<AppModal
		v-show="isModalVisible"
		@closeModal="closeModal"
	>
		<template v-slot:header>
			{{ isLogin ? `Login` : `Register` }}
		</template>

		<template v-slot:body>
			<form v-if="isLogin" class="form" @submit.prevent="submitFormLogin">
				<AppInput
					v-model="formLogin.login.value"
					@blur="formLogin.login.blur"
					placeholder="Login"
				/>
				<p v-if="formLogin.login.touched && formLogin.login.errors.required && authorizationStore.isRegistered" class="error">fill in the field</p>
				<AppInput
					v-model="formLogin.password.value"
					@blur="formLogin.password.blur"
					placeholder="Password"/>
				<p v-if="formLogin.password.touched && formLogin.password.errors.required && authorizationStore.isRegistered" class="error">fill in the
					field</p>
				<p v-if="!authorizationStore.isRegistered" class="error">user does not exist or password is incorrect</p>
				<AppButton
					:disabled="!formLogin.valid"
					type="submit"
				>
					Ok
				</AppButton>
			</form>

			<form v-if="isRegister" class="form" @submit.prevent="submitFormRegister">
				<AppInput
					v-model="formRegister.login.value"
					@blur="formRegister.login.blur"
					placeholder="Login"
					type="text"
				/>
				<p v-if="formRegister.login.touched && formRegister.login.errors.required" class="error">fill in the field</p>
				<AppInput
					v-model="formRegister.password.value"
					@blur="formRegister.password.blur"
					placeholder="Password"
				/>
				<p v-if="formRegister.password.touched && formRegister.password.errors.required" class="error">fill in the field</p>
				<AppInput
					v-model="formRegister.name.value"
					@blur="formRegister.name.blur"
					placeholder="Name"
				/>
				<p v-if="formRegister.name.touched && formRegister.name.errors.required" class="error">fill in the field</p>
				<AppInput
					v-model="formRegister.lastName.value"
					@blur="formRegister.lastName.blur"
					placeholder="Last name"
				/>
				<p v-if="formRegister.lastName.touched && formRegister.lastName.errors.required" class="error">fill in the field</p>
				<AppButton
					@click="closeModalUserRegister"
					:disabled="!formRegister.valid"
					type="submit"
				>
					Ok
				</AppButton>
			</form>
		</template>
	</AppModal>
  <RouterView />
</template>

<script setup>
import { ref } from "vue";
import { RouterView } from 'vue-router';
import { useForm } from './use/form';
import { useAuthorization } from './stores/authorization';

import {
	Header,
	AppButton,
	AppModal,
	AppInput,
} from "./components";

const authorizationStore = useAuthorization();

//Validation Form Registration
const required = val => !!val;
const formRegister = useForm({
	login: {
		value: '',
		validators: {required}
	},
	password: {
		value: '',
		validators: {required}
	},
	name: {
		value: '',
		validators: {required}
	},
	lastName: {
		value: '',
		validators: {required}
	},
});

const submitFormRegister = () => {
	authorizationStore.registrationUser(formRegister.login.value, formRegister.password.value, formRegister.name.value,
		formRegister.lastName.value);

	closeModal();

	formRegister.login.value = "";
	formRegister.password.value = "";
	formRegister.name.value = "";
	formRegister.lastName.value = "";
}


//Validation Form Login
const formLogin = useForm({
	login: {
		value: '',
		validators: {required}
	},
	password: {
		value: '',
		validators: {required}
	},
});

const submitFormLogin = () => {
	authorizationStore.loginUser(formLogin.login.value, formLogin.password.value);

	formLogin.login.value = "";
	formLogin.password.value = "";
}


//Modal
const isModalVisible = ref(false);

const openModal = () => {
	isModalVisible.value = true;
}

const closeModal = () => {
	isModalVisible.value = false;
}

const isLogin = ref(false);
const isRegister = ref(false);

const setLogin = () => {
	isLogin.value = true;
	isRegister.value = false;
}

const setRegister = () => {
	isRegister.value = true;
	isLogin.value = false;
}

</script>

<style lang="scss" scoped>
@import "./assets/variables";
.form {
	display: flex;
	flex-direction: column;
	gap: 16px;

	.btn {
		max-width: 100%;
	}
}

.error {
	font-size: 12px;
	color: $alerts---error--300;
}
</style>
