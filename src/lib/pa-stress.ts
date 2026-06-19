// PA Stress: stress cá nhân · cảm xúc · điều tiết tâm lý
// LOẠI TRỪ: burnout công việc (→ WA) · xung đột gia đình gây stress (→ MA)
import { detectEscalation } from '../data/pa-kb-stress'

export {
  detectEscalation,
  getStressTechniques,
  getImmediateTechnique,
  getMbtiGroup,
  STRESS_RECOGNITION,
  STRESS_TECHNIQUES,
  VN_STRESS_SITUATIONS,
  WHEN_TO_SEEK_HELP,
  type MbtiGroup,
  type StressRecognition,
  type TechniqueTiers,
  type ImmediateTechnique,
} from '../data/pa-kb-stress'

export const STRESS_DISCLAIMER =
  'Thông tin hỗ trợ phát triển bản thân · không thay thế chuyên gia tâm lý · Nếu stress kéo dài > 2 tuần + ảnh hưởng sinh hoạt → tìm hỗ trợ chuyên nghiệp'

export function checkStressEscalation(userMsg: string): boolean {
  return detectEscalation(userMsg)
}
