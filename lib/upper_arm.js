import inquirer from "inquirer";
import { readFileSync } from "fs";

export class EvaluationPart {
  static #questionTable;

  construction() {}

  static importScoreData = () => {
    const questionJson = readFileSync("./lib/question_data.json", "utf-8");
    EvaluationPart.#questionTable = JSON.parse(questionJson);
  };

  score() {}

  question() {
    const upper_arm_question = EvaluationPart.#questionTable.upper_arm;
    let score;
    [upper_arm_question].forEach((question) => {
      score += this.#promptQuestion(question);
    });
  }

  #promptQuestion() {}
  l;
}
