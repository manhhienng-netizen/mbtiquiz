import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ArenaUpsellModal } from '../components/ArenaUpsellModal'
import { RolePlayCaseCard, type RevealStep } from '../components/RolePlayCaseCard'
import WaShell, { WA_ACCENT } from '../components/WaShell'
import WaTopBar from '../components/WaTopBar'
import type { CaseRole, RolePlayCase } from '../data/roleplay-case-studies'
import { ROLEPLAY_CASES } from '../data/roleplay-case-studies'
import { getLatestMBTI } from '../db/tncb-db'
import { saveArcState } from '../lib/arena-arc-db'
import type { ArcState } from '../lib/arena-arc'
import { recordCompletion, resolveProgressRole } from '../lib/arena-progress'
import { isPremiumActive } from '../lib/arena-premium'
import {
  generateFreeformConsequence,
  validateFreeformInput,
  type FreeformResult,
} from '../lib/arena-case-generator'
import {
  canRetry,
  PREMIUM_RETRY_PER_ARC,
} from '../lib/arena-retry'
import { getStaticArcForRole } from '../lib/arena-static-arcs'
import {
  buildOutcomeText,
  createAiArcShell,
  filterCases,
  findResumableArc,
  getCurrentEpisodeIndex,
  initStaticArc,
  isArcPaywalled,
  isEpisodeResolved,
  isStaticArcFinished,
  nextArcEpisode,
  pickSmartArcEntry,
  resumeArc,
  shouldEndArc,
  type ArenaContext,
  type ArenaFocus,
} from '../lib/arena-session'

const ROLE_PILL_LABELS: Record<CaseRole, string> = {
  NV: 'Nhân viên',
  MG: 'Quản lý',
  KH: 'Khách hàng',
  DT: 'Đối tác',
  VT: 'Chuyển vai',
}

const VALID_ROLES = new Set<CaseRole>(['NV', 'MG', 'KH', 'DT', 'VT'])

type Phase = 'loading' | 'playing' | 'loading-ai' | 'arc-ended' | 'arc-paywall'

function parseArenaContext(searchParams: URLSearchParams): ArenaContext {
  return {
    role: searchParams.get('role') || undefined,
    scenario: searchParams.get('scenario') || undefined,
    typePair: searchParams.get('typePair') || undefined,
    origin:
      searchParams.get('origin') || searchParams.get('relationship') || undefined,
  }
}

function parseRole(raw: string | null): CaseRole | null {
  if (!raw) return null
  const upper = raw.toUpperCase()
  return VALID_ROLES.has(upper as CaseRole) ? (upper as CaseRole) : null
}

function getCharacterLabel(state: ArcState): string {
  const chars = state.context.characters
  const raw =
    chars.subordinate ??
    chars.colleague ??
    chars.client ??
    chars.boss ??
    chars.partner ??
    'nhân vật'
  return raw.split('—')[0]?.trim() ?? raw
}

function derivePhase(state: ArcState): Phase {
  if (state.source === 'static') {
    return isStaticArcFinished(state) ? 'arc-ended' : 'playing'
  }

  const resolvedCount = state.episodes.filter((ep) => isEpisodeResolved(ep)).length
  const current = state.episodes[getCurrentEpisodeIndex(state)]
  if (current && !isEpisodeResolved(current)) return 'playing'
  if (resolvedCount > 0 && shouldEndArc(state.context, resolvedCount)) {
    return 'arc-ended'
  }
  return 'playing'
}

function EpisodeRetryBar({
  arcNumber,
  episodeNumber,
  retriesUsed,
  onRetry,
  onUpsell,
}: {
  arcNumber: number
  episodeNumber: number
  retriesUsed: number
  onRetry: () => void
  onUpsell: () => void
}) {
  const retryCheck = canRetry(arcNumber, episodeNumber, retriesUsed)

  if (retryCheck.allowed) {
    return (
      <button
        type="button"
        onClick={onRetry}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          fontSize: 13,
          color: 'rgba(255,255,255,0.45)',
          cursor: 'pointer',
          fontFamily: 'inherit',
          marginBottom: 10,
        }}
      >
        ↩ Chọn lại
        {retryCheck.isPremiumFeature ? (
          <span style={{ fontSize: 11, color: 'rgba(168,230,61,0.6)', marginLeft: 6 }}>
            ({PREMIUM_RETRY_PER_ARC - retriesUsed} lần còn lại)
          </span>
        ) : null}
      </button>
    )
  }

  if (retryCheck.reason === 'need-premium') {
    return (
      <button
        type="button"
        onClick={onUpsell}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          fontSize: 13,
          color: 'rgba(168,230,61,0.7)',
          cursor: 'pointer',
          fontFamily: 'inherit',
          marginBottom: 10,
        }}
      >
        ↩ Chọn lại ✨ Premium
      </button>
    )
  }

  if (retryCheck.reason === 'premium-limit-reached') {
    return (
      <p
        style={{
          margin: '0 0 10px',
          fontSize: 11,
          fontStyle: 'italic',
          color: 'rgba(255,255,255,0.35)',
        }}
      >
        Đã dùng hết lượt chọn lại tập này — hậu quả là một phần của câu chuyện.
      </p>
    )
  }

  return null
}

function ArcEndButton({
  children,
  onClick,
  variant = 'primary',
}: {
  children: ReactNode
  onClick: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
}) {
  const styles =
    variant === 'primary'
      ? {
          background: WA_ACCENT,
          color: '#0A0A0F',
          border: 'none',
        }
      : variant === 'secondary'
        ? {
            background: 'rgba(255,255,255,0.08)',
            color: 'rgba(255,255,255,0.85)',
            border: '1px solid rgba(255,255,255,0.15)',
          }
        : {
            background: 'none',
            color: 'rgba(255,255,255,0.5)',
            border: 'none',
          }

  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: '100%',
        padding: '14px 16px',
        borderRadius: 12,
        fontSize: 14,
        fontWeight: variant === 'primary' ? 700 : 600,
        cursor: 'pointer',
        fontFamily: 'inherit',
        ...styles,
      }}
    >
      {children}
    </button>
  )
}

function ArcPaywallCard({
  characterName,
  onBack,
}: {
  characterName: string
  onBack: () => void
}) {
  return (
    <div
      style={{
        margin: '24px 16px',
        borderRadius: 16,
        padding: '24px 20px',
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(168,230,61,0.25)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
    >
      <p
        style={{
          margin: '0 0 12px',
          fontSize: 18,
          fontWeight: 700,
          lineHeight: 1.4,
          color: '#fff',
        }}
      >
        Tập 2 — Sân tập thông minh
      </p>
      <p
        style={{
          margin: '0 0 20px',
          fontSize: 14,
          lineHeight: 1.6,
          color: 'rgba(255,255,255,0.65)',
        }}
      >
        Bạn vừa xử xong tập với {characterName}. Tập 2 AI sinh tiếp theo cách bạn vừa xử —
        nhân vật giữ nguyên, câu chuyện nối tiếp.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button
          type="button"
          style={{
            padding: '14px 16px',
            borderRadius: 12,
            border: `1px solid ${WA_ACCENT}66`,
            background: 'rgba(168,230,61,0.12)',
            color: WA_ACCENT,
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          Nâng cấp Premium
        </button>
        <button
          type="button"
          onClick={onBack}
          style={{
            padding: '12px',
            background: 'none',
            border: 'none',
            color: 'rgba(255,255,255,0.45)',
            fontSize: 13,
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          ← Về sân tập
        </button>
      </div>
    </div>
  )
}

export default function ArenaSession() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const mode = searchParams.get('mode')
  const typeParam = searchParams.get('type')
  const resumeParam = searchParams.get('resume')
  const isSmart = mode === 'smart'
  const isResume = resumeParam === 'true'

  const arenaContext = useMemo(
    () => parseArenaContext(searchParams),
    [searchParams],
  )
  const contextPool = useMemo(
    () => filterCases(ROLEPLAY_CASES, arenaContext),
    [arenaContext],
  )
  const role = parseRole(arenaContext.role ?? searchParams.get('role'))

  const [arcState, setArcState] = useState<ArcState | null>(null)
  const [phase, setPhase] = useState<Phase>('loading')
  const [mbtiType, setMbtiType] = useState<string>('INTJ')
  const [cardStep, setCardStep] = useState<RevealStep>('context')
  const [selectedChoiceId, setSelectedChoiceId] = useState<'A' | 'B' | 'C' | null>(
    null,
  )
  const [premium, setPremium] = useState(() => isPremiumActive())
  const [freeformLoading, setFreeformLoading] = useState(false)
  const [freeformResult, setFreeformResult] = useState<FreeformResult | null>(null)
  const [freeformError, setFreeformError] = useState<string | null>(null)
  const [submittedFreeform, setSubmittedFreeform] = useState('')
  const [retriesUsed, setRetriesUsed] = useState(0)
  const [cardResetKey, setCardResetKey] = useState(0)
  const [showUpsell, setShowUpsell] = useState(false)

  const currentEpisodeIndex = arcState ? getCurrentEpisodeIndex(arcState) : 0
  const currentEpisode = arcState?.episodes[currentEpisodeIndex] ?? null
  const currentCase = currentEpisode?.case ?? null

  const progressLabel = useMemo(() => {
    if (!arcState) return ''
    const epNum = currentEpisodeIndex + 1
    const total =
      arcState.source === 'static' ? ` / ${arcState.episodes.length}` : ''
    const scenarioTag = arenaContext.scenario ? ` · ${arenaContext.scenario}` : ''
    return `Tập ${arcState.arcNumber} · Tình huống ${epNum}${total}${scenarioTag}`
  }, [arcState, currentEpisodeIndex, arenaContext.scenario])

  const arcSummaryMirror = useMemo(() => {
    if (!arcState || arcState.episodes.length === 0) return ''
    const last = arcState.episodes[arcState.episodes.length - 1]
    return last?.case.mirrorMoment ?? ''
  }, [arcState])

  const characterName = arcState ? getCharacterLabel(arcState) : 'nhân vật'

  const initArc = useCallback(async (
    r: CaseRole,
    ctx: ArenaContext,
    filteredPool: RolePlayCase[],
    options?: { skipResume?: boolean },
  ) => {
    setPhase('loading')
    if (ctx.scenario || ctx.typePair || ctx.origin) {
      sessionStorage.setItem('arena_portal_pool_count', String(filteredPool.length))
    }
    if (ctx.origin === 'smart' || ctx.mbtiGroup) {
      sessionStorage.setItem('arena_smart_pool_count', String(filteredPool.length))
    }
    if (!options?.skipResume) {
      const saved = await resumeArc(r)
      if (saved) {
        if (Object.values(ctx).some(Boolean) && !saved.context.arenaContext) {
          saved.context = { ...saved.context, arenaContext: ctx }
          await saveArcState(saved)
        }
        setArcState(saved)
        setPhase(derivePhase(saved))
        return
      }
    }
    const fresh = initStaticArc(r, ctx)
    if (!fresh) {
      navigate('/work/san-tap', { replace: true })
      return
    }
    await saveArcState(fresh)
    setArcState(fresh)
    setRetriesUsed(0)
    setPhase('playing')
  }, [navigate])

  useEffect(() => {
    let cancelled = false

    async function boot() {
      void getLatestMBTI()
        .then((row) => {
          if (!cancelled) setMbtiType(row?.mbtiType ?? 'INTJ')
        })
        .catch(() => {
          if (!cancelled) setMbtiType('INTJ')
        })

      if (isResume) {
        const saved = await findResumableArc()
        if (cancelled) return
        if (!saved) {
          navigate('/work/san-tap', { replace: true })
          return
        }
        setArcState(saved)
        setPhase(derivePhase(saved))
        return
      }

      if (isSmart) {
        const mbtiRow = await getLatestMBTI().catch(() => null)
        if (cancelled) return
        const mbti = typeParam || mbtiRow?.mbtiType || 'INTJ'
        const { role: smartRole, pool, context: smartCtx } = await pickSmartArcEntry(mbti)
        if (cancelled) return
        await initArc(smartRole, smartCtx, pool, { skipResume: true })
        return
      }

      if (!role) {
        navigate('/work/san-tap', { replace: true })
        return
      }
      await initArc(role, arenaContext, contextPool)
    }

    void boot()
    return () => {
      cancelled = true
    }
  }, [
    role,
    arenaContext,
    contextPool,
    navigate,
    initArc,
    isResume,
    isSmart,
    typeParam,
  ])

  const effectiveRole = role ?? arcState?.context.role ?? null

  useEffect(() => {
    setCardStep('context')
    setSelectedChoiceId(null)
    setFreeformResult(null)
    setFreeformError(null)
    setFreeformLoading(false)
    setSubmittedFreeform('')
  }, [currentCase?.id])

  async function persistArc(state: ArcState) {
    setArcState(state)
    await saveArcState(state)
  }

  async function proceedAfterEpisode(outcome: string, choiceKey: string, freeformInput?: string) {
    if (!arcState || !currentCase || !effectiveRole) return

    const updatedEpisodes = arcState.episodes.map((ep, i) =>
      i === currentEpisodeIndex
        ? {
            ...ep,
            resolvedChoiceId: freeformInput ? undefined : (choiceKey as 'A' | 'B' | 'C'),
            freeformInput: freeformInput || ep.freeformInput,
            outcome,
          }
        : ep,
    )
    const updated: ArcState = { ...arcState, episodes: updatedEpisodes }
    await persistArc(updated)

    const progressRole = resolveProgressRole(
      updated.context.role as ArenaFocus,
      currentCase.role,
    )
    if (progressRole !== 'random') {
      await recordCompletion(progressRole, currentCase.id, choiceKey).catch(() => {})
    }

    setFreeformResult(null)
    setFreeformError(null)
    setSubmittedFreeform('')
    setSelectedChoiceId(null)

    if (updated.source === 'static') {
      if (isStaticArcFinished(updated)) {
        setPhase('arc-ended')
      }
      return
    }

    const resolvedCount = updated.episodes.filter((ep) => isEpisodeResolved(ep)).length
    if (shouldEndArc(updated.context, resolvedCount)) {
      setPhase('arc-ended')
      return
    }

    setPhase('loading-ai')
    const result = await nextArcEpisode(updated, outcome)
    if (!result) {
      setPhase('arc-ended')
      return
    }
    await persistArc(result.arcState)
    setPhase('playing')
  }

  async function handleEpisodeComplete() {
    if (!arcState || !currentCase || !selectedChoiceId || !effectiveRole) return
    const outcome = buildOutcomeText(currentCase, selectedChoiceId)
    await proceedAfterEpisode(outcome, selectedChoiceId)
  }

  async function handleFreeformSubmit(input: string) {
    if (!currentCase || !arcState) return

    const validation = validateFreeformInput(input)
    if (!validation.valid) {
      if (validation.reason === 'crisis') {
        setFreeformError(
          'Nếu bạn đang gặp khó khăn thật ngoài đời, có thể tìm người tin cậy để chia sẻ.',
        )
      } else if (validation.reason === 'too-short') {
        setFreeformError('Viết rõ hơn một chút về cách bạn sẽ xử lý nhé.')
      } else {
        setFreeformError('Cách xử hơi dài — viết gọn lại trong 300 ký tự.')
      }
      return
    }

    setFreeformError(null)
    setFreeformLoading(true)

    const result = await generateFreeformConsequence(
      {
        hook: currentCase.hook,
        setup: currentCase.setup,
        characters: arcState.context.characters,
      },
      input,
    )

    setFreeformLoading(false)

    if (!result) {
      setFreeformError('Chưa xử lý được, thử diễn đạt cách khác xem.')
      return
    }

    setSubmittedFreeform(input)
    setFreeformResult(result)
  }

  async function handleFreeformEpisodeComplete() {
    if (!freeformResult || !submittedFreeform) return
    await proceedAfterEpisode(freeformResult.later, 'freeform', submittedFreeform)
  }

  function handleRetry() {
    if (!arcState) return
    const episodeNum = currentEpisodeIndex + 1
    const check = canRetry(arcState.arcNumber, episodeNum, retriesUsed)
    if (!check.allowed) return

    setRetriesUsed((prev) => prev + 1)
    setSelectedChoiceId(null)
    setFreeformResult(null)
    setFreeformError(null)
    setSubmittedFreeform('')
    setFreeformLoading(false)
    setCardResetKey((k) => k + 1)
    setCardStep('context')
  }

  async function handleReplay() {
    if (!arcState || !effectiveRole) return
    if (!isPremiumActive()) {
      setShowUpsell(true)
      return
    }

    setRetriesUsed(0)
    setSelectedChoiceId(null)
    setFreeformResult(null)
    setFreeformError(null)
    setSubmittedFreeform('')
    setCardResetKey((k) => k + 1)

    if (arcState.source === 'static') {
      const fresh = getStaticArcForRole(arcState.context.role)
      if (!fresh) return
      await persistArc(fresh)
      setPhase('playing')
      return
    }

    const replayState: ArcState = {
      ...arcState,
      context: {
        ...arcState.context,
        arcId: `${arcState.context.arcId}-replay-${Date.now()}`,
        episodeNumber: 1,
        previousOutcome: '',
        difficultyLevel: 1,
        isComplete: false,
      },
      episodes: [],
    }

    setPhase('loading-ai')
    const result = await nextArcEpisode(replayState, '')
    if (!result) {
      await persistArc(replayState)
      setPhase('playing')
      return
    }
    await persistArc(result.arcState)
    setPhase('playing')
  }

  async function handleNewArc() {
    if (!arcState) return
    setRetriesUsed(0)

    if (arcState.arcNumber === 1) {
      if (isPremiumActive()) {
        void handleStartAiArc()
      } else {
        setPhase('arc-paywall')
      }
      return
    }

    if (!isPremiumActive()) {
      setShowUpsell(true)
      return
    }

    const lastEp = arcState.episodes[arcState.episodes.length - 1]
    const lastOutcome = lastEp?.outcome ?? ''
    const shell = createAiArcShell(arcState, lastOutcome)

    setPhase('loading-ai')
    const result = await nextArcEpisode(shell, lastOutcome)
    if (!result) {
      setPhase('arc-ended')
      return
    }
    await persistArc(result.arcState)
    setPremium(isPremiumActive())
    setPhase('playing')
  }

  function getContinueLabel(): string {
    if (!arcState) return 'Tiếp →'
    if (
      arcState.source === 'static' &&
      currentEpisodeIndex < arcState.episodes.length - 1
    ) {
      return 'Tình huống tiếp →'
    }
    if (
      arcState.source === 'ai' &&
      !shouldEndArc(
        arcState.context,
        arcState.episodes.filter((e) => isEpisodeResolved(e)).length + 1,
      )
    ) {
      return 'Tình huống tiếp →'
    }
    return 'Kết thúc tập →'
  }

  const showRetryZone =
    !!freeformResult ||
    (!!selectedChoiceId &&
      (cardStep === 'consequence' || cardStep === 'feedback' || cardStep === 'mirror'))

  const episodeFooter =
    showRetryZone && arcState ? (
      <>
        <EpisodeRetryBar
          arcNumber={arcState.arcNumber}
          episodeNumber={currentEpisodeIndex + 1}
          retriesUsed={retriesUsed}
          onRetry={handleRetry}
          onUpsell={() => setShowUpsell(true)}
        />
      </>
    ) : null

  async function handleStartAiArc() {
    if (!arcState) return
    const nextNum = arcState.arcNumber + 1
    if (isArcPaywalled(nextNum)) {
      setPhase('arc-paywall')
      return
    }

    const lastEp = arcState.episodes[arcState.episodes.length - 1]
    const lastOutcome = lastEp?.outcome ?? ''
    const shell = createAiArcShell(arcState, lastOutcome)

    setPhase('loading-ai')
    const result = await nextArcEpisode(shell, lastOutcome)
    if (!result) {
      setPhase('arc-ended')
      return
    }
    await persistArc(result.arcState)
    setPremium(isPremiumActive())
    setRetriesUsed(0)
    setPhase('playing')
  }

  if (!effectiveRole && phase === 'loading') {
    return (
      <WaShell>
        <div style={{ padding: '48px 24px', textAlign: 'center' }}>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', margin: 0 }}>
            Đang tải tập...
          </p>
        </div>
      </WaShell>
    )
  }

  if (!effectiveRole) return null

  return (
    <WaShell>
      <div style={{ width: '100%', maxWidth: 480, margin: '0 auto' }}>
        <WaTopBar
          backLabel="Sân tập"
          backRoute="/work/san-tap"
          roleLabel={ROLE_PILL_LABELS[effectiveRole]}
          rightText={progressLabel || undefined}
        />

        {phase === 'loading' || phase === 'loading-ai' ? (
          <div style={{ padding: '48px 24px', textAlign: 'center' }}>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', margin: 0 }}>
              {phase === 'loading-ai'
                ? 'Đang dệt tình huống tiếp...'
                : 'Đang tải tập...'}
            </p>
          </div>
        ) : null}

        {phase === 'arc-paywall' ? (
          <ArcPaywallCard
            characterName={characterName}
            onBack={() => navigate('/work/san-tap')}
          />
        ) : null}

        {phase === 'arc-ended' && arcState ? (
          <div
            style={{
              margin: '16px',
              borderRadius: 16,
              padding: '24px 20px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(168,230,61,0.2)',
            }}
          >
            <p
              style={{
                margin: '0 0 8px',
                fontSize: 18,
                fontWeight: 700,
                color: '#fff',
              }}
            >
              Kết thúc tập {arcState.arcNumber}
            </p>
            <p
              style={{
                margin: '0 0 20px',
                fontSize: 14,
                lineHeight: 1.65,
                color: 'rgba(255,255,255,0.65)',
                fontStyle: 'italic',
              }}
            >
              {arcSummaryMirror}
            </p>
            {arcState.arcNumber === 1 ? (
              <p
                style={{
                  margin: '0 0 16px',
                  fontSize: 13,
                  lineHeight: 1.6,
                  color: 'rgba(255,255,255,0.5)',
                }}
              >
                Bạn vừa xử xong tập với {characterName}. Tập 2 AI sinh tiếp theo cách bạn
                vừa xử.
              </p>
            ) : null}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {premium ? (
                <ArcEndButton variant="secondary" onClick={() => void handleReplay()}>
                  ↻ Chơi lại tập này — thử cách xử khác từ đầu
                </ArcEndButton>
              ) : (
                <ArcEndButton variant="secondary" onClick={() => setShowUpsell(true)}>
                  ↻ Chơi lại tập này ✨ Premium
                </ArcEndButton>
              )}
              <ArcEndButton variant="primary" onClick={() => void handleNewArc()}>
                {arcState.arcNumber === 1 ? 'Tập mới →' : 'Tập tiếp theo →'}
              </ArcEndButton>
              <ArcEndButton variant="ghost" onClick={() => navigate('/work/san-tap')}>
                Về bản đồ phản xạ
              </ArcEndButton>
            </div>
          </div>
        ) : null}

        {showUpsell ? (
          <ArenaUpsellModal
            onClose={() => setShowUpsell(false)}
            onReplayPool={() => setShowUpsell(false)}
          />
        ) : null}

        {phase === 'playing' && currentCase ? (
          <div style={{ padding: '0 16px 40px' }}>
            {currentCase.tags.includes('ai-arc') ? (
              <div
                style={{
                  marginBottom: 8,
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  color: 'rgba(168,230,61,0.65)',
                }}
              >
                AI · Tập {arcState?.arcNumber}
              </div>
            ) : null}

            <RolePlayCaseCard
              key={`${currentCase.id}-${cardResetKey}`}
              case_={currentCase}
              mbtiType={mbtiType}
              onStepChange={setCardStep}
              onChoiceSelect={setSelectedChoiceId}
              enableFreeform
              onFreeformSubmit={(input) => void handleFreeformSubmit(input)}
              freeformLoading={freeformLoading}
              freeformError={freeformError}
              interactionLocked={!!freeformResult}
              hideChoiceRetry
            />

            {showRetryZone && !freeformResult && cardStep !== 'mirror' ? (
              <div style={{ marginTop: 8 }}>{episodeFooter}</div>
            ) : null}

            {freeformResult ? (
              <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div
                  style={{
                    borderRadius: 10,
                    padding: '14px 16px',
                    background: 'rgba(255,255,255,0.05)',
                  }}
                >
                  <p
                    style={{
                      margin: '0 0 6px',
                      fontSize: 11,
                      color: 'rgba(255,255,255,0.45)',
                    }}
                  >
                    Ngay sau đó
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 14,
                      lineHeight: 1.65,
                      color: 'rgba(255,255,255,0.85)',
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {freeformResult.immediate}
                  </p>
                </div>
                <div
                  style={{
                    borderRadius: 10,
                    padding: '14px 16px',
                    background: 'rgba(255,255,255,0.05)',
                  }}
                >
                  <p
                    style={{
                      margin: '0 0 6px',
                      fontSize: 11,
                      color: 'rgba(255,255,255,0.45)',
                    }}
                  >
                    Về sau
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 14,
                      lineHeight: 1.65,
                      color: 'rgba(255,255,255,0.85)',
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {freeformResult.later}
                  </p>
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: 13,
                    lineHeight: 1.6,
                    color: 'rgba(168,230,61,0.8)',
                    fontStyle: 'italic',
                  }}
                >
                  {freeformResult.reflection}
                </p>
                {episodeFooter}
                <button
                  type="button"
                  onClick={() => void handleFreeformEpisodeComplete()}
                  style={{
                    width: '100%',
                    marginTop: 4,
                    padding: '14px 16px',
                    borderRadius: 12,
                    border: 'none',
                    background: WA_ACCENT,
                    color: '#0A0A0F',
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}
                >
                  {getContinueLabel()}
                </button>
              </div>
            ) : null}

            {cardStep === 'mirror' && selectedChoiceId && !freeformResult ? (
              <>
                {episodeFooter}
                <button
                type="button"
                onClick={() => void handleEpisodeComplete()}
                style={{
                  width: '100%',
                  marginTop: 4,
                  padding: '14px 16px',
                  borderRadius: 12,
                  border: 'none',
                  background: WA_ACCENT,
                  color: '#0A0A0F',
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
                >
                  {getContinueLabel()}
                </button>
              </>
            ) : null}
          </div>
        ) : null}
      </div>
    </WaShell>
  )
}
