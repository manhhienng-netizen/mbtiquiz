import { describe, expect, it } from "vitest";
import {
  acceptPhase3,
  answerQuestion,
  continueFromPhase2Preview,
  initQuizState,
  type LikertValue,
} from "./adaptive-quiz-engine";

function randomAnswer(): LikertValue {
  return ([1, 2, 3, 4, 5] as const)[Math.floor(Math.random() * 5)]!;
}

function runToPhase3Prompt() {
  let state = initQuizState();
  let guard = 0;

  while (!state.showPhase2Preview && guard < 50) {
    const q = state.currentQuestion;
    if (!q) break;
    state = answerQuestion(state, q.id, randomAnswer());
    guard++;
  }

  state = continueFromPhase2Preview(state);
  guard = 0;

  while (!state.showPhase3Prompt && !state.isComplete && guard < 60) {
    const q = state.currentQuestion;
    if (!q) break;
    state = answerQuestion(state, q.id, randomAnswer());
    guard++;
  }

  return state;
}

describe("acceptPhase3", () => {
  it("always yields a Phase 3 question when prompt was shown (5 runs)", () => {
    for (let run = 0; run < 5; run++) {
      const before = runToPhase3Prompt();
      if (!before.showPhase3Prompt) continue;

      const after = acceptPhase3(before);
      expect(after.isComplete).toBe(false);
      expect(after.phase3Active).toBe(true);
      expect(after.phase).toBe(3);
      expect(after.currentQuestion).not.toBeNull();
      expect(after.currentQuestion?.phase).toBe(3);
    }
  });
});
