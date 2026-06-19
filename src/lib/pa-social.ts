// PA Xã hội: kỹ năng kết bạn · ranh giới cá nhân · conflict đời thường
// LOẠI TRỪ: kỹ năng giao tiếp công việc (→ WA) · xung đột vợ chồng/bố mẹ (→ MA)
import {
  ENVIRONMENT_STYLE,
  type MbtiGroup,
} from '../data/pa-kb-social-environment'

export {
  getSocialStyle,
  getBoundaryScriptsByGroup,
  getFriendshipSpaces,
  getOpeningScripts,
  getMbtiGroup,
  SOCIAL_STYLE_BY_GROUP,
  FRIENDSHIP_SPACES,
  OPENING_SCRIPTS,
  BOUNDARY_SCRIPTS,
  CONFLICT_SCRIPTS,
  NETWORKING_GUIDE,
  ENVIRONMENT_STYLE,
  PRACTICAL_GREEN_ACTIONS,
  VN_ENV_ORGANIZATIONS,
  ECO_PSYCHOLOGY_TRAPS,
  VN_ENVIRONMENT_CONTEXT,
  type MbtiGroup,
  type SocialStyle,
  type BoundaryScript,
} from '../data/pa-kb-social-environment'

export const SOCIAL_DISCLAIMER =
  'Thông tin phát triển bản thân · mang tính tham khảo'

export function getEnvironmentStyle(group: MbtiGroup) {
  return ENVIRONMENT_STYLE[group]
}
