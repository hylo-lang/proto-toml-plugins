import { readFileSync } from "node:fs";
import { cp, mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join as pathJoin } from "node:path";
import toml from "toml";
import { test } from "vitest";
import { $ as $$, type Shell } from "zx/core";

export function run({
	name,
	afterInstall,
}: {
	name: string;
	afterInstall?: ($: Shell) => Promise<void>;
}) {
	const tomlPathSource = pathJoin(import.meta.dirname, name, "plugin.toml");
	const content = readFileSync(tomlPathSource, { encoding: "utf-8" });
	const data = toml.parse(content) as Plugin;
	const platform = getPlatform();
	const supportPlatforms = Object.keys(data.platform);
	const skip = !supportPlatforms.includes(platform);
	console.log(`[${name}] supports: [${supportPlatforms}], current: ${platform}, skip: ${skip}`);
	const $ = $$({ verbose: true });

	test.skipIf(skip)(`proto install ${name}`, { timeout: Number.POSITIVE_INFINITY }, async () => {
		const dir = await mkdtemp(`${tmpdir()}/proto-plugin-test-${name}`);
		const tomlPathDist = pathJoin(dir, "plugin.toml");
		await cp(tomlPathSource, tomlPathDist);
		
		await $`(cd ${dir} && pwd && proto plugin add ${name} source:./plugin.toml && proto install ${name} latest)`;
		if (afterInstall) {
			await afterInstall($);
		}
	});
}

type Plugin = {
	name: string;
	platform: Partial<Record<"linux" | "macos" | "windows", object>>;
};

function getPlatform(): "linux" | "macos" | "windows" | "unknown" {
	return process.platform === "linux"
		? "linux"
		: process.platform === "darwin"
			? "macos"
			: process.platform === "win32"
				? "windows"
				: "unknown";
}
