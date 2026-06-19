const ILLUSTRATION_EMOJI: Record<string, string> = {
  building_blocks: '🧱',
  running_jumping: '🏃',
  playing_with_friends: '👫',
  organizing_toys: '📦',
  looking_at_friends: '👀',
  thinking_hard: '🤔',
  remembering_lesson: '💡',
  raising_hand_fast: '✋',
  comforting_friend: '🤗',
  inviting_to_play: '🎮',
  asking_teacher: '🙋',
  thinking_about_friend: '💭',
  racing_winning: '🏆',
  everyone_happy: '😊',
  puzzle_game: '🧩',
  following_rules: '📋',
  museum_visit: '🏛️',
  planned_activity: '📅',
  outdoor_adventure: '🌳',
  family_gathering: '👨‍👩‍👧',
  neat_desk: '✏️',
  books_everywhere: '📚',
  cozy_corner: '🛋️',
  moving_around: '🔄',
  run_outside: '🌞',
  show_parents: '🎨',
  reading_book: '📖',
  checking_homework: '✅',
  examining_toy: '🔍',
  sharing_toy: '🎁',
  reading_instructions: '📄',
  open_and_play: '🎉',
  playtime_home: '🏠',
  classroom_question: '🏫',
}

interface SproutIllustrationProps {
  illustrationKey: string
  size?: 'sm' | 'md' | 'lg'
}

const SIZE_CLASS = {
  sm: 'text-2xl',
  md: 'text-4xl',
  lg: 'text-5xl',
} as const

export default function SproutIllustration({
  illustrationKey,
  size = 'md',
}: SproutIllustrationProps) {
  const emoji = ILLUSTRATION_EMOJI[illustrationKey] ?? '🌱'
  return (
    <span
      className={`inline-flex items-center justify-center ${SIZE_CLASS[size]}`}
      role="img"
      aria-hidden
    >
      {emoji}
    </span>
  )
}
