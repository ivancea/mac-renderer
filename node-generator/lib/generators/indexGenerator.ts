import { ManfredAwesomicCV } from "../../generated/mac";
import { promises as fs } from "fs";
import path from "path";
import { generateLeftColumn } from "./leftColumnGenerator";
import { generateRightColumn } from "./rightColumnGenerator";
import { generatorFrom } from "../utils";

/**
 * Generates HTML from a MAC object.
 */
export const generateIndex = generatorFrom(async function* (mac: ManfredAwesomicCV) {
  const styles = await fs.readFile(path.resolve(__dirname, "../../generated/styles.css"), "utf8");

  const fullName = mac.aboutMe.profile.name + " " + mac.aboutMe.profile.surnames;

  yield `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8"/>
        <title>${fullName}</title>
        <style>${styles}</style>
      </head>
      <body class="mac">
      <div class="left-column-holder">
        <div class="left-column">${await generateLeftColumn(mac)}</div>
      </div>
      <div class="right-column-holder">
        <div class="right-column">${await generateRightColumn(mac)}</div>
      </div>
      </body>
    </html>
  `;
});
