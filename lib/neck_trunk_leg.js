import { EvaluationPart } from "./assesment_part.js";

export class NeckTrunkLeg {
  #score;

  constructor() {
    this.neck = new EvaluationPart("neck");
    this.trunk = new EvaluationPart("trunk");
    this.leg = new EvaluationPart("leg");
    this.workload = new EvaluationPart("workload");
  }

  get score() {
    this.#score = this.calcScore();
    return this.#score;
  }

  recordScores = async () => {
    await this.neck.question();
    await this.trunk.question();
    await this.leg.question();
    await this.workload.question();
  };

  calcScore() {
    // スコアはSCORE_TABLEより導かれる
    // テーブルの縦軸は頸部のスコアにより決定される
    // テーブルの横軸は体幹と下肢のスコアにより決定される
    // *** 例 ***
    // 頸部のスコアが3の場合は3行目
    // 体幹のスコアが3、下肢のスコアが2の場合は3列目
    // 上記の場合、スコアは3となる
    // **********

    const SCORE_TABLE = [
      [1, 3, 2, 3, 3, 4, 5, 5, 6, 6, 7, 7],
      [2, 3, 2, 3, 4, 5, 5, 5, 6, 7, 7, 7],
      [3, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 7],
      [5, 5, 5, 6, 6, 7, 7, 7, 7, 7, 8, 8],
      [7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8],
      [8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9],
    ];
    const rowIndex = this.#calcRowIndex();
    const columnIndex = this.#calcColumnIndex();
    return SCORE_TABLE[rowIndex][columnIndex];
  }

  #calcRowIndex() {
    // 例: 頸部のスコアが3の場合は3行目
    return this.neck.score - 1;
  }

  #calcColumnIndex() {
    // 例: 体幹のスコアが3、下肢のスコアが2の場合は6列目
    return (this.trunk.score - 1) * 2 + this.leg.score;
  }
}
