import { UpperLimb } from "./upper_limb.js";
import { NeckTrunkLeg } from "./neck_trunk_leg.js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

import { QuestionController } from "./question_controller.js";

export class Rula {
  #judgementData;
  #upperLimb;
  #neckTrunkLeg;

  constructor() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const judgementJson = readFileSync(
      __dirname + "/judgement_data.json",
      "utf-8",
    );
    this.#judgementData = JSON.parse(judgementJson);
    this.#upperLimb = new UpperLimb();
    this.#neckTrunkLeg = new NeckTrunkLeg();
  }

  recordScore = async () => {
    QuestionController.importQuestionData();
    await this.#upperLimb.recordScores();
    await this.#neckTrunkLeg.recordScores();
  };

  result = () => {
    const grandScore = this.#calcGrandScore();
    let resultRow;
    this.#judgementData.forEach((row) => {
      if (row.grandScore.includes(grandScore)) {
        resultRow = row;
      }
    });
    const actionLevel = resultRow.actionLevel;
    const judgement = resultRow.judgement;

    console.log(`アクションレベル    : ${actionLevel}`);
    console.log(`総合スコア          : ${grandScore}`);
    console.log(`判定                : ${judgement}`);
  };

  #calcGrandScore = () => {
    const GRAND_SCORE_TABLE = [
      [1, 2, 3, 3, 4, 5, 5],
      [2, 2, 3, 4, 4, 5, 5],
      [3, 3, 3, 4, 4, 5, 6],
      [3, 3, 3, 4, 5, 6, 6],
      [4, 4, 4, 5, 6, 7, 7],
      [5, 5, 5, 6, 7, 7, 7],
      [5, 6, 6, 6, 7, 7, 7],
      [5, 6, 7, 7, 7, 7, 7],
    ];
    const UPPER_LIMB_LIMIT = 8;
    const NECK_TRUNK_LEG_LIMIT = 7;
    const rowIndex = this.#calcIndex(this.#upperLimb.score, UPPER_LIMB_LIMIT);
    const columnIndex = this.#calcIndex(
      this.#neckTrunkLeg.score,
      NECK_TRUNK_LEG_LIMIT,
    );
    return GRAND_SCORE_TABLE[rowIndex][columnIndex];
  };

  #calcIndex = (num, limit) => {
    return Math.min(num, limit) - 1;
  };
}
