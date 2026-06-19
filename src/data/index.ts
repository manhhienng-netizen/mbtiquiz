export * from "./colors";
export * from "./types";
export * from "./questions";
export * from "./personalities-data-vi";
export * from "./numerology";
export * from "./can-chi";
export * from "./numerology-compat";
export * from "./type-data";
export * from "./tam-linh";
export {
  findConvergences,
  getTraitLabel,
  getTraitDefinition,
  selectArchetypeFromTraits,
  generatePersonaCompressed,
  type ConvergenceInput,
  type ConvergenceOutput,
} from "./convergence-traits";
export {
  ARCHETYPE_DATA,
  GROWTH_ZONE_BY_MBTI,
  selectArchetype,
  TYPE_TO_ARCHETYPE_HINT,
  type ArchetypeData,
} from "./archetype-engine";

// ── 16p Knowledge ─────────────────────────────────────────
export {
  MORNING_STYLES,
  GROWTH_AREAS,
  NERIS_FRAMEWORK,
  ARTICLE_SOURCES,
  WORK_TIPS as KNOWLEDGE_WORK_TIPS,
  STRESS_PATTERNS as KNOWLEDGE_STRESS_PATTERNS,
} from "./16p-knowledge-distilled";

export {
  CONFLICT_BY_TRAIT,
  HEALTH_NUDGES,
  HEALTH_BY_ROLE,
  FOUR_HORSEMEN as KNOWLEDGE_FOUR_HORSEMEN,
  CONFLICT_RESOLUTION_PLAYBOOK as KNOWLEDGE_CONFLICT_PLAYBOOK,
  TEAM_BUILDING_QUESTIONS as KNOWLEDGE_TEAM_BUILDING_QUESTIONS,
  TEAM_BUILDING_ROTATION as KNOWLEDGE_TEAM_BUILDING_ROTATION,
  ANSWER_SIGNALS as KNOWLEDGE_ANSWER_SIGNALS,
} from "./16p-knowledge-supplement";

// ── MBTI Quiz (adaptive Likert) ───────────────────────────
export {
  PHASE1_QUESTIONS,
  PHASE2_POOL,
  PHASE3_POOL,
  PREVIEW_MESSAGES,
  PHASE_LABELS,
  ALL_QUESTIONS,
  calculateDimensionScore,
  getMBTIType,
  getPCC,
  isDimensionAmbiguous,
  isDimensionClear,
  MIN_PER_DIM,
  MAX_PER_DIM,
  THRESHOLDS,
  type Dimension,
  type QuizQuestion as MbtiQuizQuestion,
  type LikertOption,
} from "./mbti-quiz-data";
