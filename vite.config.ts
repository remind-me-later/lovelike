import { defineConfig } from "vite";

export default defineConfig({
	// Your Vite configuration goes here
	build: {
		target: "esnext",
		minify: "esbuild",
	},
	esbuild: {
		target: "esnext",
		minifyIdentifiers: true,
		minifySyntax: true,
		minifyWhitespace: true,
		keepNames: false,
		color: true,
		mangleProps: /^[_#]/,
	},
});
