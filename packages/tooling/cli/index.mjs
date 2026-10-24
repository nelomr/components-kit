#!/usr/bin/env node

import path from "path";
import { fileURLToPath } from "url";

import { build } from "vite";
import { startVitest } from "vite-plus/test/node";

import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const buildCommand = async () => {
  await build({
    configFile: path.resolve(__dirname, "./../vite.config.mjs"),
  });
};

const testCommand = async (argv) => {
  await startVitest(
    "test",
    [],
    { watch: argv.watch },
    {
      configFile: path.resolve(__dirname, "./../vite.config.mjs"),
    },
  );
};

yargs(hideBin(process.argv))
  .command("build", "build component", () => {}, buildCommand)
  .command("test", "run tests", () => {}, testCommand)
  .parse();
