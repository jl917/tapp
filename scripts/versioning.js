import { replaceInFile } from "replace-in-file";

const argVersion = process.argv[2];

const version = argVersion.replace(/(\d+\.\d+\.\d+)-alpha\.(\d+)/, "$1-$2");

const versioningFiles = [
  {
    files: ["package.json"],
    from: /"version": ".*"/,
    to: `"version": "${version}"`,
    countMatches: true,
  },
  {
    files: ["src-tauri/tauri.conf.json"],
    from: /"version": ".*"/,
    to: `"version": "${version}"`,
    countMatches: true,
  },
  {
    files: ["src-tauri/Cargo.toml"],
    from: /^version = ".*"/m,
    to: `version = "${version}"`,
    countMatches: true,
  },
];

for (let vFile of versioningFiles) {
  try {
    await replaceInFile({
      files: vFile.files,
      from: new RegExp(vFile.from),
      to: vFile.to,
      countMatches: vFile.countMatches,
    });
  } catch (error) {
    console.error("Error occurred:", error);
  }
}
