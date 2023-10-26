#!/usr/bin/env node

import { Command } from "commander";
import fs from "fs";
import { Schema, Validator } from "jsonschema";
import path from "path";
import { generateHtml } from ".";
import { ManfredAwesomicCV } from "./lib/mac";

const program = new Command();

program
  .name("mac-renderer")
  .description("Convert a MAC JSON to HTML (stdout)")
  .argument("<mac-file>", "MAC JSON file")
  .action(async (macFile: string) => {
    const schema: unknown = JSON.parse(fs.readFileSync(path.resolve(__dirname, "mac-schema.json"), "utf8"));
    const input = fs.readFileSync(path.resolve(process.cwd(), macFile), "utf8");

    const mac: unknown = JSON.parse(input);

    new Validator().validate(mac, schema as Schema, { throwError: true });

    const html = await generateHtml(mac as ManfredAwesomicCV);

    console.log(html);
  });

program.parse();
