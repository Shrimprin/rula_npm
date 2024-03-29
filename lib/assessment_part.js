import { QuestionController } from "./question_controller.js";

export class AssessmentPart {
  #score;
  #partName;
  #answers;

  constructor(partName) {
    this.#partName = partName;
  }

  get score() {
    this.#score = this.#answers.reduce((sum, answer) => sum + answer.score, 0);
    return this.#score;
  }

  question = async () => {
    this.#answers = await QuestionController.promptQuestions(this.#partName);
  };
}
