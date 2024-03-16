import { EvaluationPart } from "./evaluation_part.js";

export class UpperLimb {
  constructor() {
    this.upperArm = new EvaluationPart("upperArm");
    this.forearm = new EvaluationPart("forearm");
    this.wrist = new EvaluationPart("wrist");
    this.workload = new EvaluationPart("workload");
  }

  get score() {
    this.score = this.calcScore();
    return this.score;
  }

  recordScores = async () => {
    await this.upperArm.question();
    await this.forearm.question();
    await this.wrist.question();
    await this.workload.question();
  };

  calcScore() {
    return (
      this.upperArm.score +
      this.forearm.score +
      this.wrist.score +
      this.workload.score
    );
  }
}
