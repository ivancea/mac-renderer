import { promises as fs } from "fs";
import { ManfredAwesomicCV, generateHtml } from "mac-renderer";

async function main() {
  const rawCv = await fs.readFile("../CV/MAC.json");
  const cv = JSON.parse(rawCv.toString()) as ManfredAwesomicCV;

  const html = await generateHtml(cv);

  await fs.writeFile("index.html", html);
}

main();
