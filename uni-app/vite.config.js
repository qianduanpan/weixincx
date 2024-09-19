import uni from '@dcloudio/vite-plugin-uni';
import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src'),
		},
	},
	plugins: [
		AutoImport({
			imports: ['vue', 'uni-app'],
		}),
		uni(),
	],
});
