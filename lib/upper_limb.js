import { AssessmentBlock } from "./assessment_block.js";
import { AssessmentPart } from "./assessment_part.js";

export class UpperLimb extends AssessmentBlock {
  constructor() {
    super({
      upperArm: new AssessmentPart("upperArm"),
      forearm: new AssessmentPart("forearm"),
      wrist: new AssessmentPart("wrist"),
      wristTwist: new AssessmentPart("wristTwist"),
      workload: new AssessmentPart("workload"),
    });
  }

  calcScore() {
    // スコアはスコアA + 力・荷重スコアで導かれる
    // スコアAはSCORE_TABLEより導かれる
    // テーブルの縦軸は上腕と前腕のスコアにより決定される
    // テーブルの横軸は手首と手首捻りのスコアにより決定される
    // *** 例 ***
    // 上腕のスコアが4, 前腕のスコアが2の場合は11行目
    // 手首のスコアが2, 手首ひねりのスコアが1の場合は3列目
    // 上記の場合、スコアAは4となる
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
    const scoreA = SCORE_TABLE[rowIndex][columnIndex];
    return scoreA + this.assessmentParts.workload.score;
  }

  #calcRowIndex() {
    // 例: 上腕のスコアが4, 前腕のスコアが2の場合は11行目
    const upperArmScore = this.assessmentParts.upperArm.score;
    const forearmScore = this.assessmentParts.forearm.score;

    if (upperArmScore <= 0) {
      return forearmScore - 1;
    } else {
      return (upperArmScore - 1) * 3 + forearmScore - 1;
    }
  }

  #calcColumnIndex() {
    // 例: 手首のスコアが2, 手首ひねりのスコアが1の場合は3列目
    return (
      (this.assessmentParts.wrist.score - 1) * 2 +
      this.assessmentParts.wristTwist.score -
      1
    );
  }
}
