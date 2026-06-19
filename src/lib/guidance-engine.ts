// src/lib/guidance-engine.ts
// SHARED util — B2B + MA dùng chung
// Re-export từ manager-diagnostic.ts (B2B owns data)
// MA import từ đây, KHÔNG import thẳng B2B path

export {
  getGuidanceCard,
  getS3GuidanceCard,
  type GuidanceCardData,
} from '../data/manager-diagnostic'
