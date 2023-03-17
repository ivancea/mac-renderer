import { ManfredAwesomicCV } from "../generated/mac";
import fs from "fs";

/**
 * Generates HTML from a MAC object.
 */
export function generateHtml(mac: ManfredAwesomicCV): string {
  // Load from disk
  const css = fs.readFileSync("generated/styles/styles.css", "utf8");

  return css;
}
