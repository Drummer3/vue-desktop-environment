<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useMouse } from "@vueuse/core";
import { useWindowManagementStore } from "../stores/windowManagement";
const store = useWindowManagementStore();
const { minimizeWindow, moveWindow, closeWindow } = store;

const { windowDetails } = defineProps<{
	windowDetails: {
		applicationName: string;
		id: number;
		position: {
			x: number;
			y: number;
		};
		size: {
			width: number;
			height: number;
		};
		isOpened: boolean;
	};
}>();
const topOffset = ref(windowDetails.position.y);
const leftOffset = ref(windowDetails.position.x);
const xMouseToWindowOffset = ref(0);
const yMouseToWindowOffset = ref(0);
const isDragging = ref(false);
const mousePos = useMouse();

watchEffect(() => {
	if (!isDragging.value) return;
	console.log(windowDetails.id);
	leftOffset.value = mousePos.x.value - xMouseToWindowOffset.value;
	topOffset.value = mousePos.y.value - yMouseToWindowOffset.value;
});
</script>
<template>
	<section
		class="application-window"
		:style="{
			width: windowDetails.size.width + 'px',
			height: windowDetails.size.height + 'px',
			top: topOffset + 'px',
			left: leftOffset + 'px',
		}"
	>
		<header
			@dragstart.stop="
				isDragging = true;
				xMouseToWindowOffset = mousePos.x.value - leftOffset;
				yMouseToWindowOffset = mousePos.y.value - topOffset;
			"
			@dragend.stop="
				isDragging = false;
				moveWindow(windowDetails.id, topOffset, leftOffset);
			"
			draggable="true"
			class="application-window__header"
		>
			<div class="application-window__header--buttons">
				<span
					@click="closeWindow(windowDetails.id)"
					class="application-window__header--close-button"
				></span>
				<span
					@click="minimizeWindow(windowDetails.id)"
					class="application-window__header--minimize-button"
				></span>
			</div>
		</header>
		<main class="application-window__main">{{ windowDetails.id }}</main>
	</section>
</template>
<style>
.application-window {
	border-radius: calc(var(--border-radius) / 2);
	border: var(--border-width) solid var(--border-color--dark);
	overflow: hidden;
	position: absolute;
	background-color: green;
}
.application-window__header {
	user-select: none;
	height: 1.5rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.application-window__header--buttons {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-inline: 0.25rem;
	height: 100%;
	gap: 0.2rem;
}

.application-window__header--close-button {
	height: 60%;
	aspect-ratio: 2/1;
	border-radius: 999px;
	cursor: pointer;
	transition: background-color;
	transition-duration: 150ms;
	background-color: red;
}
.application-window__header--close-button:hover {
	background-color: darkred;
}

.application-window__header--minimize-button {
	height: 60%;
	aspect-ratio: 2/1;
	border-radius: 999px;
	cursor: pointer;
	transition: background-color;
	transition-duration: 150ms;
	background-color: yellow;
}
.application-window__header--minimize-button:hover {
	background-color: orange;
}

.application-window__main {
	color: var(--text-color--dark);
}
</style>
