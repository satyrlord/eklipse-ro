import { mkdir, rm } from "node:fs/promises";
import { resolve, sep } from "node:path";
import { spawn } from "node:child_process";

const workspaceRoot = process.cwd();
const temporaryRoot = resolve(workspaceRoot, "tmp");
const browserBuild = resolve(temporaryRoot, "browser-dist");
const browserCoverage = resolve(temporaryRoot, "coverage", "browser");
const nycOutput = resolve(browserCoverage, ".nyc_output");

function assertTemporaryPath(path: string): void {
  if (!path.startsWith(`${temporaryRoot}${sep}`)) {
    throw new Error(`Refusing to change a path outside ${temporaryRoot}: ${path}`);
  }
}

async function runNpm(args: string[], environment: NodeJS.ProcessEnv): Promise<void> {
  const npmCli = process.env.npm_execpath;
  if (!npmCli) {
    throw new Error("Run this script through npm so npm_execpath is available.");
  }

  await new Promise<void>((resolveRun, rejectRun) => {
    const child = spawn(process.execPath, [npmCli, ...args], {
      cwd: workspaceRoot,
      env: environment,
      stdio: "inherit",
    });

    child.on("error", rejectRun);
    child.on("exit", (code, signal) => {
      if (code === 0) {
        resolveRun();
        return;
      }

      rejectRun(new Error(`npm ${args.join(" ")} stopped with ${signal ?? `exit code ${code}`}`));
    });
  });
}

for (const path of [browserBuild, browserCoverage]) {
  assertTemporaryPath(path);
  await rm(path, { recursive: true, force: true });
}

await mkdir(nycOutput, { recursive: true });

const coverageEnvironment = {
  ...process.env,
  VITE_COVERAGE: "true",
  NYC_OUTPUT_DIR: nycOutput,
};

const normalEnvironment = {
  ...process.env,
  VITE_COVERAGE: "false",
};

await runNpm(["exec", "--", "vite", "build", "--outDir", "tmp/browser-dist"], normalEnvironment);
await runNpm(["exec", "--", "playwright", "test"], normalEnvironment);

assertTemporaryPath(browserBuild);
await rm(browserBuild, { recursive: true, force: true });

await runNpm(["exec", "--", "vite", "build", "--outDir", "tmp/browser-dist"], coverageEnvironment);
await runNpm(["exec", "--", "playwright", "test"], coverageEnvironment);
await runNpm(
  [
    "exec",
    "--",
    "nyc",
    "report",
    "--temp-dir",
    "tmp/coverage/browser/.nyc_output",
    "--report-dir",
    "tmp/coverage/browser/report",
    "--reporter",
    "text-summary",
    "--reporter",
    "html",
  ],
  coverageEnvironment,
);
