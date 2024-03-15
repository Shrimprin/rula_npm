import { EvaluationPart } from "./evaluation_part.js";

export class UpperLimb {
  constructor() {
    this.upperArm = new EvaluationPart("upperArm");
    this.forearm = new EvaluationPart("forearm");
    this.wrist = new EvaluationPart("wrist");
    // this.workload = // TODO
  }

  get score() {
    this.score = this.calcScore();
    return this.score;
  }

  recordScores = async () => {
    await this.upperArm.question();
    await this.forearm.question();
    return await this.wrist.question();
  };

  calcScore() {
    return this.upperArm.score + this.forearm.score + this.wrist.score;
  }
}
