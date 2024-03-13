import inquirer from "inquirer";
import { readFileSync } from "fs";

export class QuestionController {
  static #questionTable;

  static importQuestionData = () => {
    const questionJson = readFileSync("./lib/question_data.json", "utf-8");
    QuestionController.#questionTable = JSON.parse(questionJson);
  };

  static promptQuestions = async (key) => {
    const upperArmTable = this.#questionTable[key];
    const questionKeys = Object.keys(upperArmTable);
    let answers = [];
    for (const questionKey of questionKeys) {
      const question = upperArmTable[questionKey];
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
