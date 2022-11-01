import { defineStore } from "pinia";

export const useWindowManagementStore = defineStore("windows", {
	state: (): {
		windows: {
			applicationName: string;
			id: number;
			position: { x: number; y: number };
			size: { width: number; height: number };
			isOpened: boolean;
		}[];
		nextId: number;
	} => ({
		windows: [],
		nextId: 0,
	}),
	actions: {
		newWindow(
			applicationName: string,
			x: number,
			y: number,
			width: number,
			height: number
		) {
			this.windows.push({
				applicationName,
				id: this.nextId++,
				position: { x, y },
				size: { width, height },
				isOpened: true,
			});
		},
		minimizeWindow(id: number) {
			console.log("minimizing: " + id);
			const index = this.windows.findIndex((window) => window.id === id);
			console.log({ object: this.windows[index].id });
			if (index !== -1) this.windows[index].isOpened = false;
		},
		expandWindow(id: number) {
			console.log("expanding: " + id);
			const index = this.windows.findIndex((window) => window.id === id);
			console.log({ object: this.windows[index].id });
			if (index !== -1) this.windows[index].isOpened = true;
		},
		closeWindow(id: number) {
			console.log("closing: " + id);
			this.windows = this.windows.filter((window) => window.id !== id);
		},
		moveWindow(id: number, x: number, y: number) {
			console.log("saving new location of " + id);
			const index = this.windows.findIndex((window) => window.id === id);
			if (index !== -1) {
				this.windows[index].position.x = x;
				this.windows[index].position.y = y;
			}
		},
	},
	getters: {
		openedWindows(state) {
			return state.windows.filter((window) => window.isOpened);
		},
	},
});
