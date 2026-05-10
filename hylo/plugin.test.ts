import { run } from "../testkit.js";

run({
	name: "hylo",
	afterInstall: async ($) => {
		await $`hc --help`;
	},
});