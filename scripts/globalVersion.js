import { execSync } from "child_process";
import { writeFileSync } from "fs";

const version = execSync("git rev-parse --short HEAD")
  .toString()
  .trim();

writeFileSync(
  "./version.js",
  `export const APP_VERSION = "${version}";`
);

console.log("Versão:", version);
