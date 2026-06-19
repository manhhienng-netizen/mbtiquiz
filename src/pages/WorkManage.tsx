import {
  useCallback,
  useEffect,
  useState,
  type CSSProperties,
  type FormEvent,
} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import AtmosphericPage from '../components/AtmosphericPage'
import { Big5CTA } from '../components/Big5CTA'
import { CaseStudyList } from '../components/CaseStudyList'
import { CoachingStyleHint } from '../components/CoachingStyleHint'
import ManagedCoachingSection from '../components/ManagedCoachingSection'
import PageSpinner from '../components/PageSpinner'
import TeamContextForm from '../components/TeamContextForm'
import { TeamBuilder } from '../components/TeamBuilder'
import {
  MANAGER_COACHING_B2B,
  type MbtiType,
} from '../data/manager-coaching-b2b'
import {
  addManagedPerson,
  deleteManagedPerson,
  getTeamContext,
  listManagedPeople,
  type ManagedPerson,
  type TeamContext,
} from '../db/tncb-db'

const MBTI_TYPES = Object.keys(MANAGER_COACHING_B2B) as MbtiType[]

type WorkTab = 'coaching' | 'cases' | 'team'

const WORK_TABS: { id: WorkTab; label: string }[] = [
  { id: 'coaching', label: 'Coaching' },
  { id: 'cases', label: 'Kịch bản 📖' },
  { id: 'team', label: 'Đội nhóm 👥' },
]

const cardStyle: CSSProperties = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.10)',
  borderRadius: '16px',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  padding: '16px',
}

const emptyStateStyle: CSSProperties = {
  ...cardStyle,
  textAlign: 'center',
  padding: '24px 20px',
  marginBottom: '16px',
}

export default function WorkManage() {
  const { id: idParam } = useParams<{ id?: string }>()
  const navigate = useNavigate()
  const [people, setPeople] = useState<ManagedPerson[]>([])
  const [teamContext, setTeamContext] = useState<TeamContext | undefined>()
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('')
  const [type, setType] = useState<MbtiType>('INTJ')
  const [adding, setAdding] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [activeTab, setActiveTab] = useState<WorkTab>('coaching')

  const selectedId =
    idParam && Number.isFinite(Number(idParam)) ? Number(idParam) : null
  const person =
    selectedId != null
      ? people.find((p) => p.id === selectedId) ?? null
      : null

  const loadPeople = useCallback(async () => {
    const [rows, ctx] = await Promise.all([listManagedPeople(), getTeamContext()])
    setPeople(rows)
    setTeamContext(ctx)
    setLoading(false)
  }, [])

  useEffect(() => {
    void loadPeople()
  }, [loadPeople])

  useEffect(() => {
    if (loading || selectedId == null) return
    if (!people.some((p) => p.id === selectedId)) {
      navigate('/work/manage', { replace: true })
    }
  }, [loading, selectedId, people, navigate])

  async function handleAdd(e: FormEvent) {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return
    setAdding(true)
    try {
      const newId = await addManagedPerson(trimmed, type)
      setName('')
      setShowForm(false)
      await loadPeople()
      navigate(`/work/manage/${newId}`)
      setActiveTab('coaching')
    } finally {
      setAdding(false)
    }
  }

  async function handleDelete(id: number, personName: string) {
    if (!window.confirm(`Xóa ${personName} khỏi danh sách?`)) return
    await deleteManagedPerson(id)
    if (selectedId === id) {
      navigate('/work/manage', { replace: true })
    }
    await loadPeople()
  }

  function selectPerson(personId: number) {
    navigate(`/work/manage/${personId}`)
    setActiveTab('coaching')
  }

  if (loading) {
    return (
      <AtmosphericPage
        overlay={selectedId != null ? 'heavy' : 'medium'}
        contentStyle={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <PageSpinner label="Đang tải..." />
      </AtmosphericPage>
    )
  }

  return (
    <AtmosphericPage
      overlay={person ? 'heavy' : 'medium'}
      style={{
        fontFamily: "'Be Vietnam Pro', sans-serif",
        color: '#fff',
      }}
      contentStyle={{ paddingBottom: '40px' }}
    >
      <div style={{ padding: '52px 20px 0' }}>
        <button
          type="button"
          onClick={() => navigate('/work')}
          style={{
            background: 'none',
            border: 'none',
            color: 'rgba(255,255,255,0.5)',
            fontSize: '14px',
            cursor: 'pointer',
            marginBottom: '20px',
          }}
        >
          ← Làm việc
        </button>

        <div
          style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.2em',
            color: 'rgba(255,255,255,0.35)',
            textTransform: 'uppercase',
          }}
        >
          Quản lý
        </div>

        <h1
          style={{
            fontSize: '26px',
            fontWeight: 700,
            lineHeight: 1.25,
            margin: '8px 0 8px',
          }}
        >
          Gợi ý hỗ trợ
          <br />
          người bạn quản lý
        </h1>

        <p
          style={{
            fontSize: '14px',
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.55)',
            marginBottom: '20px',
          }}
        >
          Ghi chú riêng trên máy bạn — không đồng bộ cloud.
        </p>
      </div>

      <div style={{ padding: '0 20px' }}>
        <TeamContextForm />

        <div
          style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            marginBottom: '16px',
          }}
        >
          {WORK_TABS.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '8px 14px',
                  borderRadius: '20px',
                  border: isActive
                    ? '1px solid rgba(168,230,61,0.55)'
                    : '1px solid rgba(255,255,255,0.12)',
                  background: isActive
                    ? 'rgba(168,230,61,0.12)'
                    : 'rgba(255,255,255,0.04)',
                  color: isActive ? '#A8E63D' : 'rgba(255,255,255,0.55)',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        {activeTab === 'coaching' ? (
          <>
            <Big5CTA />
            <CoachingStyleHint />

            {people.length === 0 && !showForm ? (
              <div style={emptyStateStyle}>
                <p
                  style={{
                    fontSize: '15px',
                    lineHeight: 1.6,
                    color: 'rgba(255,255,255,0.65)',
                    margin: '0 0 20px',
                  }}
                >
                  Thêm người bạn đang quản lý để xem gợi ý hỗ trợ họ.
                </p>
                <button
                  type="button"
                  onClick={() => setShowForm(true)}
                  style={{
                    padding: '12px 24px',
                    borderRadius: '12px',
                    border: '1px solid #A8E63D',
                    background: 'rgba(168,230,61,0.10)',
                    color: '#A8E63D',
                    fontSize: '14px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}
                >
                  + Thêm người
                </button>
              </div>
            ) : null}

            {people.length > 0 ? (
              <div style={{ marginBottom: '16px' }}>
                <p
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.40)',
                    margin: '0 0 10px',
                  }}
                >
                  Người bạn quản lý
                </p>
                {people.map((p) => {
                  const isSelected = p.id === selectedId
                  return (
                    <div
                      key={p.id}
                      style={{
                        ...cardStyle,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginBottom: '10px',
                        border: isSelected
                          ? '1px solid rgba(168,230,61,0.45)'
                          : cardStyle.border,
                        background: isSelected
                          ? 'rgba(168,230,61,0.08)'
                          : cardStyle.background,
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          if (p.id != null) selectPerson(p.id)
                        }}
                        style={{
                          flex: 1,
                          background: 'none',
                          border: 'none',
                          color: 'inherit',
                          textAlign: 'left',
                          cursor: 'pointer',
                          padding: 0,
                          fontFamily: 'inherit',
                        }}
                      >
                        <div
                          style={{
                            fontSize: '16px',
                            fontWeight: 600,
                            marginBottom: '4px',
                          }}
                        >
                          {p.name}
                        </div>
                        <span
                          style={{
                            display: 'inline-block',
                            padding: '2px 10px',
                            borderRadius: '20px',
                            background: 'rgba(168,230,61,0.12)',
                            border: '1px solid rgba(168,230,61,0.25)',
                            color: '#A8E63D',
                            fontSize: '12px',
                            fontWeight: 700,
                          }}
                        >
                          {p.type}
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (p.id != null) void handleDelete(p.id, p.name)
                        }}
                        aria-label={`Xóa ${p.name}`}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'rgba(255,255,255,0.35)',
                          fontSize: '13px',
                          cursor: 'pointer',
                          padding: '8px',
                          fontFamily: 'inherit',
                        }}
                      >
                        Xóa
                      </button>
                    </div>
                  )
                })}
              </div>
            ) : null}

            {person ? (
              <>
                <p
                  style={{
                    fontSize: '14px',
                    lineHeight: 1.6,
                    color: 'rgba(255,255,255,0.50)',
                    marginBottom: '16px',
                  }}
                >
                  Bốn mảng để bạn hỗ trợ {person.name} phát triển — hỏi trực
                  tiếp là cách chắc nhất.
                </p>
                <ManagedCoachingSection
                  name={person.name}
                  type={person.type}
                  teamContext={teamContext}
                />
                <Link
                  to="/work/chat"
                  style={{
                    display: 'block',
                    width: '100%',
                    marginTop: '8px',
                    padding: '16px',
                    borderRadius: '14px',
                    border: '1px solid #A8E63D',
                    background: 'rgba(168,230,61,0.08)',
                    color: '#A8E63D',
                    fontSize: '15px',
                    fontWeight: 700,
                    textAlign: 'center',
                    textDecoration: 'none',
                    fontFamily: 'inherit',
                  }}
                >
                  Hỏi sâu hơn về {person.name}
                </Link>
              </>
            ) : people.length > 0 ? (
              <div style={emptyStateStyle}>
                <p
                  style={{
                    fontSize: '14px',
                    lineHeight: 1.6,
                    color: 'rgba(255,255,255,0.65)',
                    margin: 0,
                  }}
                >
                  Chọn một người ở danh sách trên để xem gợi ý coaching, hoặc
                  thêm người mới.
                </p>
              </div>
            ) : null}

            {(people.length > 0 || showForm) && (
              <div style={{ marginTop: people.length > 0 ? '8px' : 0 }}>
                {!showForm ? (
                  <button
                    type="button"
                    onClick={() => setShowForm(true)}
                    style={{
                      width: '100%',
                      padding: '14px',
                      borderRadius: '12px',
                      border: '1px dashed rgba(255,255,255,0.20)',
                      background: 'transparent',
                      color: 'rgba(255,255,255,0.55)',
                      fontSize: '14px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                    }}
                  >
                    + Thêm người
                  </button>
                ) : (
                  <form
                    onSubmit={(e) => void handleAdd(e)}
                    style={{ ...cardStyle, marginTop: '8px' }}
                  >
                    <div
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.40)',
                        marginBottom: '14px',
                      }}
                    >
                      Thêm người mới
                    </div>
                    <label
                      htmlFor="managed-name"
                      style={{
                        display: 'block',
                        fontSize: '13px',
                        color: 'rgba(255,255,255,0.55)',
                        marginBottom: '6px',
                      }}
                    >
                      Tên
                    </label>
                    <input
                      id="managed-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="vd: Minh"
                      autoFocus
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        padding: '12px 14px',
                        borderRadius: '10px',
                        border: '1px solid rgba(255,255,255,0.15)',
                        background: 'rgba(0,0,0,0.25)',
                        color: '#fff',
                        fontSize: '15px',
                        fontFamily: 'inherit',
                        marginBottom: '14px',
                      }}
                    />
                    <label
                      htmlFor="managed-type"
                      style={{
                        display: 'block',
                        fontSize: '13px',
                        color: 'rgba(255,255,255,0.55)',
                        marginBottom: '6px',
                      }}
                    >
                      MBTI type
                    </label>
                    <select
                      id="managed-type"
                      value={type}
                      onChange={(e) => setType(e.target.value as MbtiType)}
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        padding: '12px 14px',
                        borderRadius: '10px',
                        border: '1px solid rgba(255,255,255,0.15)',
                        background: 'rgba(0,0,0,0.25)',
                        color: '#fff',
                        fontSize: '15px',
                        fontFamily: 'inherit',
                        marginBottom: '16px',
                      }}
                    >
                      {MBTI_TYPES.map((t) => (
                        <option
                          key={t}
                          value={t}
                          style={{ background: '#1a1a22' }}
                        >
                          {t}
                        </option>
                      ))}
                    </select>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button
                        type="submit"
                        disabled={adding || !name.trim()}
                        style={{
                          flex: 1,
                          padding: '12px',
                          borderRadius: '10px',
                          border: 'none',
                          background: name.trim()
                            ? 'rgba(168,230,61,0.90)'
                            : 'rgba(255,255,255,0.10)',
                          color: name.trim()
                            ? '#0A0A0F'
                            : 'rgba(255,255,255,0.35)',
                          fontSize: '14px',
                          fontWeight: 700,
                          cursor: name.trim() ? 'pointer' : 'not-allowed',
                          fontFamily: 'inherit',
                        }}
                      >
                        {adding ? 'Đang lưu...' : 'Lưu'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowForm(false)
                          setName('')
                        }}
                        style={{
                          padding: '12px 18px',
                          borderRadius: '10px',
                          border: '1px solid rgba(255,255,255,0.15)',
                          background: 'transparent',
                          color: 'rgba(255,255,255,0.55)',
                          fontSize: '14px',
                          cursor: 'pointer',
                          fontFamily: 'inherit',
                        }}
                      >
                        Hủy
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </>
        ) : null}

        {activeTab === 'cases' ? (
          <div style={{ paddingTop: '4px' }}>
            <p
              style={{
                margin: '0 0 12px',
                fontSize: '12px',
                lineHeight: 1.6,
                color: 'rgba(255,255,255,0.50)',
              }}
            >
              Ví dụ thật từ sếp SMB VN — đọc trong 1 phút, nhận ra pattern.
            </p>
            <CaseStudyList />
          </div>
        ) : null}

        {activeTab === 'team' ? <TeamBuilder /> : null}
      </div>
    </AtmosphericPage>
  )
}
