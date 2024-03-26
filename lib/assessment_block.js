export class AssessmentBlock {
  #score;
  #assessmentParts = {};

  constructor(assessmentParts) {
    this.#assessmentParts = assessmentParts;
  }

  get score() {
    this.#score = this.calcScore();
    return this.#score;
  }

  get assessmentParts() {
    return this.#assessmentParts;
  }

  async recordScores() {
    for (const evaluationPart of Object.values(this.#assessmentParts)) {
      await evaluationPart.question();
    }
  }

  calcScore() {
    // 子クラスで実装する
    throw new Error("calcScore is not implemented");
  }

  #calcRowIndex() {
    // 子クラスで実装する
    throw new Error("calcRowIndex is not implemented");
  }

  #calcColumnIndex() {
    // 子クラスで実装する
    throw new Error("calcColumnIndex is not implemented");
  }
}
