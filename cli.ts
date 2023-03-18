#!/usr/bin/env node

import { Command } from "commander";
import fs from "fs";
import { Validator } from "jsonschema";
import path from "path";
import { generateHtml } from ".";

const program = new Command();

program
  .name("mac-renderer")
  .description("Convert a MAC JSON to HTML (stdout)")
  .argument("<mac-file>", "MAC JSON file")
  .action(async (macFile) => {
    const schema = JSON.parse(fs.readFileSync(path.resolve(__dirname, "mac-schema.json"), "utf8"));
    const input = fs.readFileSync(path.resolve(process.cwd(), macFile), "utf8");

    const mac = JSON.parse(input);

    new Validator().validate(mac, schema, { throwError: true });

    const html = await generateHtml(mac);

    console.log(html);
  });

program.parse();
