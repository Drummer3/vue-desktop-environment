<script setup lang="ts">
import { ref } from "vue";
import ApplicationIcon from "./ApplicationIcon.vue";
import { useWindowManagementStore } from "../stores/windowManagement";
import { storeToRefs } from "pinia";

const store = useWindowManagementStore();
const { windows } = storeToRefs(store);
const { newWindow, minimizeWindow, expandWindow } = store;
const popUp = ref(false);

function getWindowWidth() {
	return window.innerWidth;
}
function getWindowHeight() {
	return window.innerHeight;
}
</script>

<template>
	<div class="dock-bar__body">
		<template v-for="window in windows">
			<ApplicationIcon
				:icon="window.applicationName"
				@click="
					() => {
						popUp = false;
						if (window.isOpened) {
							minimizeWindow(window.id);
						} else {
							expandWindow(window.id);
						}
					}
				"
				size="medium"
			/>
			<p>{{window.id}}</p>
		</template>
		<ApplicationIcon
			@click="() => (popUp = !popUp)"
			icon="application"
			size="medium"
		/>
	</div>
	<div v-show="popUp" class="dock-popup">
		<div class="dock-popup__body">
			<ApplicationIcon
				@click="
					newWindow(
						'calculator',
						getWindowWidth() / 2,
						getWindowHeight() / 2,
						getWindowWidth() / 4,
						getWindowHeight() / 4
					);
					popUp = false;
				"
				icon="calculator"
				size="large"
			/>
		</div>
	</div>
</template>

<style scoped>
.dock-bar__body {
	z-index: 101;
	width: max-content;

	position: absolute;
	bottom: 0.5rem;
	left: 0;
	right: 0;

	color: var(--text-color--dark);

	margin-inline: auto;
	padding: 0.5rem;

	display: flex;
	justify-content: center;
	align-items: center;

	border: var(--border-width) solid var(--border-color--dark);
	border-radius: var(--border-radius);

	backdrop-filter: blur(12px) brightness(1.5);
}

.dock-popup {
	position: absolute;
	z-index: 100;
	inset: 0;
	backdrop-filter: blur(2px) brightness(0.9);

	display: flex;
	justify-content: center;
	align-items: center;
}
.dock-popup__body {
	display: grid;
	grid-template-columns: repeat(5, minmax(0, 1fr));
	gap: 2rem;
}
</style>
