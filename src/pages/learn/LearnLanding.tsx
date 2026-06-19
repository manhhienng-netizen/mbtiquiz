import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  AGE_GROUP_THEME,
  COLORS,
  LAYOUT,
  type AgeGroupId,
} from '@tncb/data/design-tokens'

const AGE_GROUP_ORDER: AgeGroupId[] = [
  'SPROUT',
  'BLOOM',
  'SPARK',
  'RISE',
  'LAUNCH',
]

const TRUST_BADGES = [
  'An toàn cho trẻ',
  'Không thu thập dữ liệu',
  'Growth framing',
] as const

export default function LearnLanding() {
  const navigate = useNavigate()

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: COLORS.background.cream }}
    >
      <div
        className="mx-auto px-4 py-8 sm:py-10"
        style={{ maxWidth: LAYOUT.maxWidth }}
      >
        <header className="text-center mb-8 sm:mb-10">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4"
            style={{
              backgroundColor: COLORS.primary[50],
              border: `1px solid ${COLORS.primary[200]}`,
            }}
          >
            <span
              className="text-sm font-semibold"
              style={{ color: COLORS.primary[700], fontFamily: 'Lexend, system-ui, sans-serif' }}
            >
              TNCB Learn
            </span>
          </div>
          <h1
            className="text-2xl sm:text-3xl font-semibold leading-tight"
            style={{
              fontFamily: 'Lexend, system-ui, sans-serif',
              color: COLORS.stone[900],
            }}
          >
            Biết mình từ sớm
          </h1>
          <p
            className="mt-2 text-base sm:text-lg"
            style={{ color: COLORS.primary[700] }}
          >
            Chọn đúng từ đầu
          </p>
        </header>

        <p
          className="text-center text-sm mb-6"
          style={{ color: COLORS.stone[600] }}
        >
          Chọn nhóm tuổi của em để bắt đầu
        </p>

        <div className="flex flex-col gap-4">
          {AGE_GROUP_ORDER.map((id, index) => {
            const theme = AGE_GROUP_THEME[id]
            return (
              <motion.button
                key={id}
                type="button"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06, duration: 0.35 }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => navigate(`/learn/onboarding?age=${id}`)}
                className="w-full text-left rounded-2xl p-4 sm:p-5 transition-shadow hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
                style={{
                  backgroundColor: COLORS.background.white,
                  border: `2px solid ${theme.border}`,
                  borderRadius: LAYOUT.borderRadius.lg,
                  boxShadow: '0 1px 3px rgba(28, 25, 23, 0.06)',
                }}
              >
                <div className="flex items-start gap-4">
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl"
                    style={{ backgroundColor: theme.bg }}
                    aria-hidden
                  >
                    {theme.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                      <span
                        className="text-lg font-semibold"
                        style={{
                          fontFamily: 'Lexend, system-ui, sans-serif',
                          color: theme.textDark,
                        }}
                      >
                        {theme.label}
                      </span>
                      <span
                        className="text-sm font-medium"
                        style={{ color: theme.accent }}
                      >
                        {theme.ageRange}
                      </span>
                    </div>
                    <p
                      className="mt-1 text-sm leading-relaxed"
                      style={{ color: COLORS.stone[600] }}
                    >
                      {theme.tagline}
                    </p>
                  </div>
                  <span
                    className="shrink-0 text-lg mt-1"
                    style={{ color: theme.accent }}
                    aria-hidden
                  >
                    →
                  </span>
                </div>
              </motion.button>
            )
          })}
        </div>

        <div
          className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-3"
          role="list"
          aria-label="Cam kết"
        >
          {TRUST_BADGES.map((badge) => (
            <span
              key={badge}
              role="listitem"
              className="rounded-full px-3 py-1 text-xs font-medium"
              style={{
                backgroundColor: COLORS.amber[100],
                color: COLORS.amber[800],
                border: `1px solid ${COLORS.amber[200]}`,
              }}
            >
              {badge}
            </span>
          ))}
        </div>

        <footer className="mt-10 text-center">
          <span className="text-sm" style={{ color: COLORS.stone[400] }}>
            TNCB Learn · 6–22 tuổi
          </span>
        </footer>
      </div>
    </div>
  )
}
