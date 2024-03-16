import { EvaluationPart } from "./evaluation_part.js";

export class NeckTrunkLeg {
  constructor() {
    this.neck = new EvaluationPart("neck");
    this.trunk = new EvaluationPart("trunk");
    this.leg = new EvaluationPart("leg");
    this.workload = new EvaluationPart("workload");
  }

  get score() {
    this.score = this.calcScore();
    return this.score;
  }

  recordScores = async () => {
    await this.neck.question();
    await this.trunk.question();
    await this.leg.question();
    await this.workload.question();
  };

  calcScore() {
    return (
      this.neck.score + this.trunk.score + this.leg.score + this.workload.score
    );
  }
}
