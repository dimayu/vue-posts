<template>
  <Header
		:isAuthorized="authorizationStore.isAuthorized"
		@openModal="openModal"
		@setLogin="setLogin"
		@setRegister="setRegister"
		@setAddPost="setAddPost"
		@setIsExit="setExit"
	/>

	<AppModal
		v-show="isModalVisible"
		@closeModal="closeModal"
	>
		<template v-slot:header>
			{{ titleModal }}
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
				<p v-if="isLoginFailed" class="error">user does not exist or password is incorrect</p>

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
				<p v-if="formRegister.lastName.touched && formRegister.lastName.errors.required" class="error">
					fill in the field</p>

				<p v-if="isRegisterFailed" class="error">a user with the same name or email exists</p>
				<AppButton
					@click="submitFormRegister"
					:disabled="!formRegister.valid && !isRegisterFailed"
					type="submit"
				>
					Ok
				</AppButton>
			</form>

			<form v-if="isAddPost" class="form" @submit.prevent="submitFormRegister">
				<AppInput
					v-model="formAddPost.title.value"
					@blur="formAddPost.title.blur"
					placeholder="Title"
					type="text"
				/>
				<p v-if="formAddPost.title.touched && formAddPost.title.errors.required" class="error">fill in the field</p>
				<AppInput
					v-model="formAddPost.body.value"
					@blur="formAddPost.body.blur"
					placeholder="Body"
				/>
				<p v-if="formAddPost.body.touched && formAddPost.body.errors.required" class="error">fill in the field</p>
				<AppButton
					@click="submitFormAddPost"
					:disabled="!formAddPost.valid"
					type="submit"
				>
					Ok
				</AppButton>
			</form>
		</template>
	</AppModal>

  <RouterView />

	<Footer/>
</template>

<script setup>
import { ref, computed } from "vue";
import { RouterView } from 'vue-router';

import { useForm } from './use/form';

import { useAuthorization } from './stores/authorization';
import { usePost } from './stores/post';

import {
	Header,
	Footer,
	AppButton,
	AppModal,
	AppInput,
} from "./components";

const authorizationStore = useAuthorization();
const postStore = usePost();

const isRegisterFailed = computed(() => authorizationStore.isRegisterFailed);
const isLoginFailed = computed(() => authorizationStore.isLoginFailed);

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

	if(!isRegisterFailed) {
		closeModal();
	}

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

	if (!isLoginFailed) {
		closeModal();
	}

	formLogin.login.value = "";
	formLogin.password.value = "";
}

//Form Add Post
const formAddPost = useForm({
	title: {
		value: '',
		validators: {required}
	},
	body: {
		value: '',
		validators: {required}
	},
});

const submitFormAddPost = () => {
	postStore.fetchGetPost(formAddPost.title.value, formAddPost.body.value);

	closeModal();

	formAddPost.title.value = "";
	formAddPost.body.value = "";
}


//Modal
const isModalVisible = ref(false);
const titleModal = ref('');

const openModal = () => {
	isModalVisible.value = true;
}

const closeModal = () => {
	isModalVisible.value = false;
}

const isLogin = ref(false);
const isRegister = ref(false);
const isAddPost = ref(false);

const setLogin = () => {
	isLogin.value = true;
	isRegister.value = false;
	isAddPost.value = false;
}

const setRegister = () => {
	isRegister.value = true;
	isLogin.value = false;
	isAddPost.value = false;
}

const setAddPost = () => {
	isAddPost.value = true;
	isRegister.value = false;
	isLogin.value = false;
}

if (isLogin) {
	titleModal.value = "Login";
}

if (isRegister) {
	titleModal.value = "Register";
}

if (isAddPost) {
	titleModal.value = "Add Post";
}

const setExit = computed(() => {
		isLogin.value = false;
});
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
