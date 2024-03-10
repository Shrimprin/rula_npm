import { UpperLimb } from "./upper_limb.js";
import { NeckTrunkLeg } from "./neck_trunk_leg.js";
import { readFileSync } from "fs";

export class Rula {
  constructor() {
    this.upperLimb = new UpperLimb();
    this.neckTrunkLeg = new NeckTrunkLeg();
    this.grandScore = this.calcGrandScore();
  }

  result = async () => {
    const judgementJson = readFileSync("./lib/judgement_data.json", "utf-8");
    const judgementTable = await JSON.parse(judgementJson);
    let resultRow;

    judgementTable.forEach((row) => {
      if (row.grand_score.includes(this.grandScore)) {
        resultRow = row;
      }
    });
    const actionLevel = resultRow.action_level;
    const judgement = resultRow.judgement;

    console.log(`アクションレベル : ${actionLevel}`);
    console.log(`総合スコア　　　 : ${this.grandScore}`);
    console.log(`判定　　　　　　 : ${judgement}`);
  };

  calcGrandScore = () => {
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
    const NECk_TRUNK_LEG_LIMIT = 7;
    const limitedUpperLimbScore = this.#limitNumber(
      this.upperLimb.score,
      UPPER_LIMB_LIMIT,
    );
    const limitedNeckTrunkLegScore = this.#limitNumber(
      this.neckTrunkLeg.score,
      NECk_TRUNK_LEG_LIMIT,
    );
    return GRAND_SCORE_TABLE[limitedUpperLimbScore - 1][
      limitedNeckTrunkLegScore - 1
    ];
  };

  #limitNumber = (num, limit) => {
    return Math.min(num, limit);
  };
}
