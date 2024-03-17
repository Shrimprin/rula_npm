import { EvaluationPart } from "./assesment_part.js";

export class UpperLimb {
  #score;

  constructor() {
    this.upperArm = new EvaluationPart("upperArm");
    this.forearm = new EvaluationPart("forearm");
    this.wrist = new EvaluationPart("wrist");
    this.wristTwist = new EvaluationPart("wristTwist");
    this.workload = new EvaluationPart("workload");
  }

  get score() {
    this.#score = this.calcScore();
    return this.#score;
  }

  recordScores = async () => {
    await this.upperArm.question();
    await this.forearm.question();
    await this.wrist.question();
    await this.wristTwist.question();
    await this.workload.question();
  };

  calcScore() {
    // スコアはSCORE_TABLEより導かれる
    // テーブルの縦軸は上腕と前腕のスコアにより決定される
    // テーブルの横軸は手首と手首捻りのスコアにより決定される
    // *** 例 ***
    // 上腕のスコアが4, 前腕のスコアが2の場合は11行目
    // 手首のスコアが2, 手首ひねりのスコアが1の場合は3列目
    // 上記の場合、上肢のスコアは4となる
    // **********

    const SCORE_TABLE = [
      [1, 2, 2, 2, 2, 3, 3, 3],
      [2, 2, 2, 2, 3, 3, 3, 3],
      [2, 3, 3, 3, 3, 3, 4, 4],
      [2, 3, 3, 3, 3, 4, 4, 4],
      [3, 3, 3, 3, 3, 4, 4, 4],
      [3, 4, 4, 4, 4, 4, 5, 5],
      [3, 3, 4, 4, 4, 4, 5, 5],
      [3, 4, 4, 4, 4, 4, 5, 5],
      [4, 4, 4, 4, 4, 5, 5, 5],
      [4, 4, 4, 4, 4, 5, 5, 5],
      [4, 4, 4, 4, 4, 5, 5, 5],
      [4, 4, 4, 5, 5, 5, 6, 6],
      [5, 5, 5, 5, 5, 6, 6, 7],
      [5, 6, 6, 6, 6, 7, 7, 7],
      [6, 6, 6, 7, 7, 7, 7, 8],
      [7, 7, 7, 7, 7, 8, 8, 9],
      [8, 8, 8, 8, 8, 9, 9, 9],
      [9, 9, 9, 9, 9, 9, 9, 9],
    ];
    const rowIndex = this.#calcRowIndex();
    const columnIndex = this.#calcColumnIndex();
    return SCORE_TABLE[rowIndex][columnIndex];
  }

  #calcRowIndex() {
    // 例: 上腕のスコアが4, 前腕のスコアが2の場合は11行目
    return (this.upperArm.score - 1) * 3 + this.forearm.score - 1;
  }

  #calcColumnIndex() {
    // 例: 手首のスコアが2, 手首ひねりのスコアが1の場合は3列目
    return (this.wrist.score - 1) * 2 + this.wristTwist.score - 1;
  }
}
