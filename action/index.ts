import { promises as fs } from "fs";
import { generatePdf } from "html-pdf-node";
import { ManfredAwesomicCV, generateHtml } from "mac-renderer";
import path from "path";

async function main() {
  const macPath = process.argv[2];
  const outputPath = process.argv[3];

  const rawCv = await fs.readFile(path.resolve(process.cwd(), macPath));
  const cv: unknown = JSON.parse(rawCv.toString());

  // Generate the HTML
  const html = await generateHtml(cv as ManfredAwesomicCV);

  // Generate a PDF with the HTML
  const pdf = await (generatePdf(
    { content: html },
    { format: "A4", scale: 0.6, printBackground: true },
  ) as unknown as Promise<Buffer>);

  await fs.mkdir(path.resolve(process.cwd(), outputPath), { recursive: true });
  await fs.writeFile(path.resolve(process.cwd(), outputPath, "index.html"), html);
  await fs.writeFile(path.resolve(process.cwd(), outputPath, "cv.pdf"), pdf);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
