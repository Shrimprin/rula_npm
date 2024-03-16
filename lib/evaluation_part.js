import { QuestionController } from "./question_controller.js";

export class EvaluationPart {
  constructor(partName) {
    this.partName = partName;
  }

  get score() {
    this.score = this.answers.reduce((sum, answer) => sum + answer.score);
    return this.score;
  }

  question = async () => {
    return (this.answers = await QuestionController.promptQuestions(
      this.partName,
    ));
  };
}
