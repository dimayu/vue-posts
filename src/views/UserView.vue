<template>
  <main>
    <div class="wrapper">
			<div v-if="!userStore.isLoading && !userStore.isError" class="user">
				<h2>{{ userStore.user.name }}</h2>
				<p>
					<span>Nick name:</span> {{ userStore.user.name }}
				</p>
				<p>
					<span>Email:</span> {{ userStore.user.email }}
				</p>
				<p>
					<span>Phone:</span> {{ userStore.user.phone }}
				</p>
				<p>
					<span>Website:</span> {{ userStore.user.website }}
				</p>
				<p>
					<span>Address:</span>
					{{ userStore.user.address.city }} ,
					{{ userStore.user.address.street }},
					{{ userStore.user.address.suite }}
				</p>
				<p>
					<span>Company:</span>
					{{ userStore.user.company.name }},
					{{ userStore.user.company.catchPhrase }},
					{{ userStore.user.company.bs }}
				</p>
			</div>

			<Loader v-if="userStore.isLoading && !userStore.isError"/>

			<h4 v-if="!userStore.isLoading && userStore.isError">
				Server Error
			</h4>
		</div>
  </main>
</template>

<script setup>
import { computed, watchEffect } from "vue";
import { useRoute } from "vue-router";

import { useUser } from "../stores/user";

import { Loader } from "../components";


const route = useRoute();
const userStore = useUser();

const userId = computed(() => route.params.id);

watchEffect(async () => {
	await userStore.fetchUser(userId.value);
});

</script>

<style lang="scss" scoped>
@import "../assets/variables";

.user {
	padding: 24px;
	box-shadow: $cards_shadow;

	h2 {
		margin-bottom: 24px;
		font-size: 24px;
	}

	h3 {
		margin-bottom: 12px;
		font-size: 20px;
	}

	p {
		margin-bottom: 12px;
		font-size: 18px;

		span {
			color: $light---neutral--500;
		}
	}
}
</style>
