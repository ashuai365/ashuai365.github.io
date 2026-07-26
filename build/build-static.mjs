import { spawnSync } from "node:child_process";
import { rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const temporaryConfigPath = resolve("next.config.mjs");
const vinextCliPath = resolve("node_modules/vinext/dist/cli.js");

writeFileSync(
  temporaryConfigPath,
  [
    "export default {",
    '  output: "export",',
    "  trailingSlash: true,",
    "};",
    "",
  ].join("\n"),
);

try {
  const result = spawnSync(process.execPath, [vinextCliPath, "build"], {
    stdio: "inherit",
    env: {
      ...process.env,
      WRANGLER_LOG_PATH: ".wrangler/wrangler.log",
    },
  });

  if (result.error) {
    throw result.error;
  }

  process.exitCode = result.status ?? 1;
} finally {
  rmSync(temporaryConfigPath, { force: true });
}
