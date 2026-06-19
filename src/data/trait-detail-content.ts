import { getTraitDefinition } from './convergence-traits-data'

export interface TraitDetailContent {
  trait: string
  label: string
  currentState: string
  potential: string
  strengthWhen: string
  watchOut: string
  famousExamples: string[]
}

const FAMOUS_EXAMPLES: Record<string, string[]> = {
  analytical: ['Albert Einstein', 'Marie Curie', 'Bill Gates'],
  independent: ['Steve Jobs', 'Amelia Earhart', 'Elon Musk'],
  empathetic: ['Oprah Winfrey', 'Mother Teresa', 'Mr. Rogers'],
  visionary: ['Martin Luther King Jr.', 'Steve Jobs', 'Nelson Mandela'],
  systematic: ['Warren Buffett', 'Angela Merkel', 'Tim Cook'],
  creative: ['David Bowie', 'Frida Kahlo', 'Hayao Miyazaki'],
  resilient: ['Serena Williams', 'Nelson Mandela', 'Malala Yousafzai'],
  nurturing: ['Princess Diana', 'Fred Rogers', 'Michelle Obama'],
  decisive: ['Winston Churchill', 'Indra Nooyi', 'Jack Ma'],
  adaptable: ['Richard Branson', 'Bruce Lee', 'Angelina Jolie'],
  intuitive_leader: ['Barack Obama', 'Sheryl Sandberg', 'Simon Sinek'],
  deep_thinker: ['Carl Jung', 'Stephen Hawking', 'Virginia Woolf'],
  practical_builder: ['Jeff Bezos', 'Sam Walton', 'Indra Nooyi'],
  tactical: ['Michael Jordan', 'Bear Grylls', 'Sun Tzu (tư tưởng)'],
  authentic: ['Keanu Reeves', 'Lady Gaga', 'Tom Hanks'],
}

export function getTraitDetail(trait: string): TraitDetailContent | null {
  const def = getTraitDefinition(trait)
  if (!def) return null

  return {
    trait: def.trait,
    label: def.label,
    currentState: def.description,
    potential: `Khi bạn chủ động phát triển, ${def.label.toLowerCase()} trở thành nền tảng bền vững — giúp bạn tạo ra giá trị lâu dài thay vì chỉ phản ứng theo thói quen.`,
    strengthWhen: def.inWork,
    watchOut: def.growthEdge,
    famousExamples: FAMOUS_EXAMPLES[def.trait] ?? [],
  }
}
