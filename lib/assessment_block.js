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
  }

  #calcRowIndex() {
    // 子クラスで実装する
  }

  #calcColumnIndex() {
    throw new Error();
    // 子クラスで実装する
  }
}
