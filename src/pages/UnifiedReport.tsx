import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AtmosphericPage from '../components/AtmosphericPage'
import CollapsibleSection from '../components/CollapsibleSection'
import PageSpinner from '../components/PageSpinner'
import { L1_UNIFIED_NARRATIVES } from '../data/l1-unified-narratives'
import {
  LIFE_PATH_THEME_MAP,
  NGU_HANH_CORE_MAP,
  NHAT_CHU_IMAGE_MAP,
} from '../data/l1-report-placeholder-maps'
import { NHAT_CHU_CONTENT } from '../data/tncb-nhatchu-content'
import { TNCB_TYPE_CONTENT } from '../data/tncb-mbti-content'
import {
  getLatestMBTI,
  getSpiritualResult,
  quizResultFromDexie,
} from '../db/tncb-db'
import { buildL1Report, type L1ReportInput } from '../lib/build-l1-report'
import type { L1ReportFilled } from '../lib/build-l1-report'

const PAGE_FONT = "'Be Vietnam Pro', system-ui, sans-serif"
const ACCENT = '#C0B8D4'

const MOCK_NARRATIVE = {
  intro: 'Đang chuẩn bị nội dung báo cáo cho type của bạn...',
  body: ['Phần phân tích chi tiết sẽ sớm được cập nhật.'],
  closing: 'Bạn thấy mình giống phần nào nhất trong bức chân dung này?',
}

interface ReportDisplayData {
  mbtiType: string
  nickname: string
  lifePathNumber?: number
  nguHanhElement?: string
  nhatChuLabel?: string
}

function dividerStyle() {
  return {
    height: 1,
    background: 'rgba(255,255,255,0.06)',
    margin: '32px 0',
    border: 'none',
  }
}

function bodyParagraphStyle(mockStyle?: { opacity: number }) {
  return {
    fontSize: 15,
    lineHeight: 1.7,
    margin: 0,
    ...mockStyle,
  }
}

function buildReportInput(
  mbtiType: string,
  element?: string,
  lifePath?: number,
  nhatChu?: string,
): L1ReportInput | null {
  if (!element || !lifePath || !nhatChu) return null
  if (!L1_UNIFIED_NARRATIVES[mbtiType]) return null

  const nguHanhCore = NGU_HANH_CORE_MAP[element]
  const lifePathTheme = LIFE_PATH_THEME_MAP[lifePath]
  const nc = NHAT_CHU_CONTENT[nhatChu]
  const canKey = nc?.can ?? nhatChu.split(/\s+/)[0]
  const nhatChuImage = NHAT_CHU_IMAGE_MAP[canKey]

  if (!nguHanhCore || !lifePathTheme || !nhatChuImage) return null

  return {
    mbtiType,
    nguHanhLabel: element,
    nguHanhCore,
    lifePath,
    lifePathTheme,
    nhatChuLabel: nc ? `${nc.can} ${nc.element}` : nhatChu,
    nhatChuImage,
  }
}

export default function UnifiedReport() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<ReportDisplayData | null>(null)
  const [report, setReport] = useState<L1ReportFilled | null>(null)

  useEffect(() => {
    async function load() {
      const [mbti, spiritual] = await Promise.all([
        getLatestMBTI(),
        getSpiritualResult(),
      ])
      const quizResult = quizResultFromDexie(mbti, spiritual)

      if (!mbti?.mbtiType && !quizResult?.mbtiType) {
        setData(null)
        setReport(null)
        setLoading(false)
        return
      }

      const mbtiType = mbti?.mbtiType ?? quizResult?.mbtiType ?? ''
      const element = spiritual?.element ?? quizResult?.element
      const lifePath = spiritual?.lifePath ?? quizResult?.lifePath
      const nhatChu = spiritual?.nhatChu ?? quizResult?.nhatChu

      setData({
        mbtiType,
        nickname:
          TNCB_TYPE_CONTENT[mbtiType]?.nickname ?? 'Nhà khám phá',
        lifePathNumber: lifePath,
        nguHanhElement: element,
        nhatChuLabel: nhatChu,
      })

      const input = buildReportInput(mbtiType, element, lifePath, nhatChu)
      setReport(input ? buildL1Report(input) : null)
      setLoading(false)
    }

    void load()
  }, [])

  if (loading) {
    return (
      <AtmosphericPage overlay="light">
        <div className="min-h-screen flex items-center justify-center">
          <PageSpinner />
        </div>
      </AtmosphericPage>
    )
  }

  if (!data) {
    return (
      <AtmosphericPage
        overlay="light"
        contentStyle={{
          fontFamily: PAGE_FONT,
          color: '#fff',
          padding: '24px',
        }}
      >
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center', paddingTop: 48 }}>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15, lineHeight: 1.6 }}>
            Hoàn thành quiz để xem báo cáo cá nhân hóa của bạn.
          </p>
          <button
            type="button"
            onClick={() => navigate('/quiz')}
            style={{
              marginTop: 20,
              background: 'none',
              border: 'none',
              color: ACCENT,
              fontSize: 14,
              cursor: 'pointer',
            }}
          >
            Làm quiz ngay →
          </button>
        </div>
      </AtmosphericPage>
    )
  }

  const hasNarrative = Boolean(L1_UNIFIED_NARRATIVES[data.mbtiType])
  const useMock = !hasNarrative || !report
  const mockStyle = useMock ? { opacity: 0.4 } : undefined

  return (
    <AtmosphericPage
      overlay="light"
      contentStyle={{
        fontFamily: PAGE_FONT,
        color: 'rgba(255,255,255,0.8)',
        padding: '20px 24px 40px',
      }}
    >
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <button
          type="button"
          onClick={() => navigate('/result')}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            fontSize: 14,
            color: 'rgba(255,255,255,0.5)',
            cursor: 'pointer',
            marginBottom: 24,
          }}
        >
          ← Về kết quả
        </button>

        <h1
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: ACCENT,
            margin: '0 0 8px',
            lineHeight: 1.3,
          }}
        >
          {data.nickname}
        </h1>
        <p
          style={{
            fontSize: 14,
            color: 'rgba(255,255,255,0.45)',
            margin: '0 0 8px',
          }}
        >
          Báo cáo tính cách đầy đủ
        </p>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', margin: 0 }}>
          {data.mbtiType}
        </p>

        {report?.title && !useMock ? (
          <p
            style={{
              fontSize: 15,
              color: 'rgba(255,255,255,0.65)',
              marginTop: 16,
              lineHeight: 1.5,
              fontStyle: 'italic',
            }}
          >
            {report.title}
          </p>
        ) : null}

        <hr style={dividerStyle()} />

        <CollapsibleSection title="Giới thiệu" variant="list" defaultOpen>
          <p style={bodyParagraphStyle(mockStyle)}>
            {report?.intro ?? MOCK_NARRATIVE.intro}
          </p>
        </CollapsibleSection>

        <CollapsibleSection title="Chân dung" variant="list">
          <div style={mockStyle}>
            {(report?.body ?? MOCK_NARRATIVE.body).map((para, i) => (
              <p
                key={i}
                style={{
                  ...bodyParagraphStyle(),
                  margin: i === 0 ? 0 : '16px 0 0',
                }}
              >
                {para}
              </p>
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="Ngũ hành" variant="list">
          <p style={bodyParagraphStyle(mockStyle)}>
            {report?.nguHanhHook ??
              'Hoàn thành phần Tâm Linh để xem phân tích Ngũ hành.'}
          </p>
        </CollapsibleSection>

        <CollapsibleSection title="Số học" variant="list">
          <p style={bodyParagraphStyle(mockStyle)}>
            {report?.soHocHook ??
              'Hoàn thành phần Tâm Linh để xem phân tích Số học.'}
          </p>
        </CollapsibleSection>

        <CollapsibleSection title="Nhật chủ" variant="list">
          <p style={bodyParagraphStyle(mockStyle)}>
            {report?.nhatChuHook ??
              'Hoàn thành phần Tâm Linh để xem phân tích Nhật Chủ.'}
          </p>
        </CollapsibleSection>

        <CollapsibleSection title="Kết" variant="list">
          <p
            style={{
              ...bodyParagraphStyle(mockStyle),
              fontStyle: 'italic',
            }}
          >
            {report?.closing ?? MOCK_NARRATIVE.closing}
          </p>
        </CollapsibleSection>

        <div
          className="flex flex-col sm:flex-row"
          style={{ gap: 12, marginTop: 40 }}
        >
          <button
            type="button"
            onClick={() => navigate('/result')}
            style={{
              flex: 1,
              padding: '14px 16px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 14,
              color: 'rgba(255,255,255,0.7)',
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            ← Về kết quả
          </button>
          <button
            type="button"
            onClick={() => navigate('/result')}
            style={{
              flex: 1,
              padding: '14px 16px',
              background: 'rgba(192,184,212,0.12)',
              border: '1px solid rgba(192,184,212,0.3)',
              borderRadius: 14,
              color: ACCENT,
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            📤 Chia sẻ
          </button>
        </div>
      </div>
    </AtmosphericPage>
  )
}
