export interface ArchetypeVisual {
  color: string
  gradient: string
  illustration: string
}

export const ARCHETYPE_VISUAL: Record<string, ArchetypeVisual> = {
  strategic_architect: {
    color: '#5C4B8A',
    gradient: 'linear-gradient(180deg, #5C4B8A 0%, #1A0F2E 100%)',
    illustration: '/assets/archetypes/archetype-strategic_architect.png',
  },
  empathetic_leader: {
    color: '#3D7A5C',
    gradient: 'linear-gradient(180deg, #3D7A5C 0%, #0F2E1A 100%)',
    illustration: '/assets/archetypes/archetype-empathetic_leader.png',
  },
  creative_pioneer: {
    color: '#D4651A',
    gradient: 'linear-gradient(180deg, #D4651A 0%, #2E1A0F 100%)',
    illustration: '/assets/archetypes/archetype-creative_pioneer.png',
  },
  resilient_builder: {
    color: '#2B5EA7',
    gradient: 'linear-gradient(180deg, #2B5EA7 0%, #0F1A2E 100%)',
    illustration: '/assets/archetypes/archetype-resilient_builder.png',
  },
  healing_teacher: {
    color: '#A0522D',
    gradient: 'linear-gradient(180deg, #A0522D 0%, #2E1A0F 100%)',
    illustration: '/assets/archetypes/archetype-healing_teacher.png',
  },
  connector_catalyst: {
    color: '#C4960A',
    gradient: 'linear-gradient(180deg, #C4960A 0%, #2E240F 100%)',
    illustration: '/assets/archetypes/archetype-connector_catalyst.png',
  },
  deep_seeker: {
    color: '#1A3550',
    gradient: 'linear-gradient(180deg, #1A3550 0%, #050D15 100%)',
    illustration: '/assets/archetypes/archetype-deep_seeker.png',
  },
}

export function getArchetypeVisual(key: string): ArchetypeVisual {
  return ARCHETYPE_VISUAL[key] ?? ARCHETYPE_VISUAL['strategic_architect']
}
