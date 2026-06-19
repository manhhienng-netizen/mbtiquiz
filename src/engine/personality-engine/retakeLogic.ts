import type { MBTIResult, PCC } from "./calculateResult";

export interface MBTIHistoryRow {
  mbtiType: string;
  identity: "A" | "T";
  eiPcc?: PCC;
  snPcc?: PCC;
  tfPcc?: PCC;
  jpPcc?: PCC;
  takenAt: string | Date;
}

export type RetakeAction = "ask_user" | "update_pcc";

export interface RetakeAskUser {
  action: "ask_user";
  message: string;
  options: Array<{ label: string; value: "new" | "old" | "pending" }>;
  previousType: string;
  newType: string;
}

export interface RetakeUpdatePcc {
  action: "update_pcc";
  message: string;
  comparison: PccComparison[];
}

export type RetakeDecision = RetakeAskUser | RetakeUpdatePcc;

export interface PccComparison {
  dimension: "EI" | "SN" | "TF" | "JP";
  before: PCC;
  after: PCC;
  improved: boolean;
}

function daysBetween(a: Date, b: Date): number {
  return Math.abs(b.getTime() - a.getTime()) / (24 * 60 * 60 * 1000);
}

function comparePCC(previous: MBTIHistoryRow, current: MBTIResult): PccComparison[] {
  const dims: Array<{ key: "EI" | "SN" | "TF" | "JP"; before?: PCC; after: PCC }> = [
    { key: "EI", before: previous.eiPcc, after: current.pcc.EI },
    { key: "SN", before: previous.snPcc, after: current.pcc.SN },
    { key: "TF", before: previous.tfPcc, after: current.pcc.TF },
    { key: "JP", before: previous.jpPcc, after: current.pcc.JP },
  ];
  const order: PCC[] = ["Slight", "Moderate", "Clear", "Very Clear"];
  return dims
    .filter((d) => d.before)
    .map((d) => ({
      dimension: d.key,
      before: d.before!,
      after: d.after,
      improved: order.indexOf(d.after) > order.indexOf(d.before!),
    }));
}

/** Pure decision logic — persistence via mbti_history table in app layer */
export function handleRetake(
  newResult: MBTIResult,
  previousResult: MBTIHistoryRow | null,
): RetakeDecision {
  if (!previousResult) {
    return {
      action: "update_pcc",
      message: `Kết quả của bạn: ${newResult.type}-${newResult.identity}`,
      comparison: [],
    };
  }

  const prevTaken = new Date(previousResult.takenAt);
  const timeGap = daysBetween(prevTaken, new Date());
  void timeGap;

  const typeFlipped = newResult.type !== previousResult.mbtiType;

  if (typeFlipped) {
    return {
      action: "ask_user",
      message: `Lần này kết quả khác với trước (${previousResult.mbtiType} → ${newResult.type}). Bạn muốn dùng kết quả nào?`,
      options: [
        { label: `Kết quả mới: ${newResult.type}`, value: "new" },
        { label: `Kết quả cũ: ${previousResult.mbtiType}`, value: "old" },
        { label: "Cả hai, để mình nghĩ thêm", value: "pending" },
      ],
      previousType: previousResult.mbtiType,
      newType: newResult.type,
    };
  }

  const comparison = comparePCC(previousResult, newResult);
  const improved = comparison.filter((c) => c.improved);
  let detail = "";
  if (improved.length > 0) {
    detail = improved
      .map((c) => `${c.dimension}: ${c.before} → ${c.after}`)
      .join(" · ");
  }

  return {
    action: "update_pcc",
    message: `Kết quả vẫn là ${newResult.type}!${detail ? ` ${detail}` : " Một số chiều đã rõ hơn."}`,
    comparison,
  };
}

export function historyFromQuizResult(result: MBTIResult, takenAt = new Date()): MBTIHistoryRow {
  return {
    mbtiType: result.type,
    identity: result.identity,
    eiPcc: result.pcc.EI,
    snPcc: result.pcc.SN,
    tfPcc: result.pcc.TF,
    jpPcc: result.pcc.JP,
    takenAt: takenAt.toISOString(),
  };
}
