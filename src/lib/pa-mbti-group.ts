export type MBTIGroup = 'NT' | 'NF' | 'ST' | 'SF'

export function getMBTIGroup(type: string): MBTIGroup {
  if (['INTJ', 'INTP', 'ENTJ', 'ENTP'].includes(type)) return 'NT'
  if (['INFJ', 'INFP', 'ENFJ', 'ENFP'].includes(type)) return 'NF'
  if (['ISTJ', 'ISTP', 'ESTJ', 'ESTP'].includes(type)) return 'ST'
  return 'SF'
}
