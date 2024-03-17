import { AssessmentBlock } from "./assessment_block.js";
import { AssessmentPart } from "./assessment_part.js";

export class NeckTrunkLeg extends AssessmentBlock {
  constructor() {
    super({
      neck: new AssessmentPart("neck"),
      trunk: new AssessmentPart("trunk"),
      leg: new AssessmentPart("leg"),
      workload: new AssessmentPart("workload"),
    });
  }

  async recordScores() {
    console.log("頸部・体幹・下肢の姿勢や負荷について教えてください。");
    await super.recordScores();
  }

  calcScore() {
    // スコアはスコアB + 力・荷重スコアで導かれる
    // スコアBはSCORE_TABLEより導かれる
    // テーブルの縦軸は頸部のスコアにより決定される
    // テーブルの横軸は体幹と下肢のスコアにより決定される
    // *** 例 ***
    // 頸部のスコアが3の場合は3行目
    // 体幹のスコアが3、下肢のスコアが2の場合は3列目
    // 上記の場合、スコアBは3となる
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
    const scoreB = SCORE_TABLE[rowIndex][columnIndex];
    return scoreB + this.assessmentParts.workload.score;
  }

  #calcRowIndex() {
    // 例: 頸部のスコアが3の場合は3行目
    return this.assessmentParts.neck.score - 1;
  }

  #calcColumnIndex() {
    // 例: 体幹のスコアが3、下肢のスコアが2の場合は6列目
    return (
      (this.assessmentParts.trunk.score - 1) * 2 +
      this.assessmentParts.leg.score -
      1
    );
  }
}
