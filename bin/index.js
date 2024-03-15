#!/usr/bin/env node

import readline from "readline";
import { program } from "commander";
import { readFileSync } from "fs";
import { join } from "path";
import { Rula } from "../lib/rula.js";

const rula = new Rula();
await rula.recordScore();
// rula.result();

// import { QuestionController } from "../lib/question_controller.js";
// QuestionController.importQuestionData();
// const answers = await QuestionController.promptQuestions("upperArm");
// console.log("#####");
// console.log(answers);

// const packageJson = JSON.parse(
//   readFileSync(join(__dirname, "package.json"), "utf-8"),
// );
// const version = packageJson.version;

// const interpretCommandInput = async () => {
//   program
//     .version(version)
//     .option("-l, --list", "List all memos")
//     .option("-r, --reference", "Show content of selected memo")
//     .option("-d, --delete", "Delete selected memo")
//     .parse(process.argv);

//   const memosController = await MemosController.build();
//   const options = program.opts();
//   if (options.list) {
//     await memosController.list();
//   } else if (options.reference) {
//     await memosController.reference();
//   } else if (options.delete) {
//     await memosController.delete();
//   } else {
//     await readStandardInput(memosController);
//   }
// };

// const readStandardInput = async (memosController) => {
//   process.stdin.setEncoding("utf8");

//   const lines = [];
//   const reader = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//   });

//   reader.on("line", (line) => {
//     lines.push(line);
//   });

//   reader.on("close", async () => {
//     await memosController.create(lines);
//   });
// };

// interpretCommandInput();
