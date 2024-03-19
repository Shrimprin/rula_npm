import inquirer from "inquirer";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

export class QuestionController {
  static #questionData;

  static importQuestionData = () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const questionJson = readFileSync(
      __dirname + "/question_data.json",
      "utf-8",
    );
    QuestionController.#questionData = JSON.parse(questionJson);
  };

  static promptQuestions = async (key) => {
    const questionTable = this.#questionData[key];
    const questionKeys = Object.keys(questionTable);
    let answers = [];
    for (const questionKey of questionKeys) {
      const question = questionTable[questionKey];
      const message = question.message;
      const choices = question.choices.map((choice) => choice.description);
      const answer = await inquirer.prompt([
        {
          type: "list",
          name: questionKey,
          message: message,
          choices: choices,
        },
      ]);
      answers.push(
        question.choices.find(
          (choice) => choice.description === answer[questionKey],
        ),
      );
    }
    return answers;
  };
}
