<template>
	<footer class="footer">
		<div class="wrapper">
			<div class="footer__items">
				<div class="footer__items__item">Copy 2023</div>
				<div class="footer__items__item">5 AM</div>
			</div>
		</div>
	</footer>
</template>

<script setup>

</script>

<style lang="scss" scoped>
@import "../assets/variables";

.footer{
	padding: 32px 0;
	margin-top: 48px;
	background-color: $light---neutral--300;
	border-top: 1px solid $light---primary--500;
	border-bottom: 1px solid $light---primary--500;

	&__items {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
}
</style>