import { QuestionController } from "./question_controller.js";

export class EvaluationPart {
  constructor(partName) {
    this.partName = partName;
  }

  // get score() {
  //   console.log(this.answers);
  //   this.score = this.answers.reduce((sum, answer) => sum + answer.score);
  //   return this.score;
  // }

  question = async () => {
    console.log(this.partName);
    return (this.answers = await QuestionController.promptQuestions(
      this.partName,
    ));
  };
}
