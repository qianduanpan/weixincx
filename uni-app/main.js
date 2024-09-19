import { createSSRApp } from 'vue';
import App from './App.vue';
import share from '@/utils/share';
import { loadPageUserEventTracking } from '@/utils/userEventTracking.js';
import * as Pinia from 'pinia';
export function createApp() {
	const app = createSSRApp(App);
	app.mixin(share);
	app.mixin(loadPageUserEventTracking);
	app.use(Pinia.createPinia());
	return {
		app,
		Pinia, // 此处必须将 Pinia 返回
	};
}
