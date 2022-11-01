<script setup lang="ts">
import { useWindowManagementStore } from "../stores/windowManagement";
import Window from "./Window.vue";

const store = useWindowManagementStore();
</script>

<template>
	<main>
		<Window v-for="window in store.openedWindows" :window-details="window" />
	</main>
</template>

<style></style>
