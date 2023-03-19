import { promises as fs } from "fs";
import { generatePdf } from "html-pdf-node";
import { ManfredAwesomicCV, generateHtml } from "mac-renderer";

async function main() {
  const rawCv = await fs.readFile("../CV/MAC.json");
  const cv: ManfredAwesomicCV = JSON.parse(rawCv.toString());

  const html = await generateHtml(cv);

  await fs.writeFile("index.html", html);

  const pdf = await (generatePdf(
    { content: html },
    { format: "A4", scale: 0.6 }
  ) as unknown as Promise<Buffer>);

  await fs.writeFile("index.pdf", pdf);
}

main();
