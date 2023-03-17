import { ManfredAwesomicCV } from "../generated/mac";
import { promises as fs } from "fs";
import path from "path";

/**
 * Generates HTML from a MAC object.
 */
export async function generateHtml(mac: ManfredAwesomicCV): Promise<string> {
  const css = await fs.readFile(path.resolve(__dirname, '../generated/styles.css'), "utf8");
  
  return css;
}
