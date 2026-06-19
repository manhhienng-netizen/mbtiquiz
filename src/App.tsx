import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import { lazy, Suspense, useEffect, useState, type ReactNode } from 'react'
import HomeButtonGate from './components/HomeButtonGate'
import P2PNav from './components/p2p/P2PNav'
import { HomeNavProvider } from './contexts/HomeNavContext'
import { getLatestMBTI } from './db/tncb-db'

function RouteLoadingSpinner() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: '#0A0A0F' }}
    >
      <div
        className="h-8 w-8 rounded-full border-2 border-[rgba(127,119,221,.3)] border-t-[#A78BFA] animate-spin"
        role="status"
        aria-label="Đang tải"
      />
    </div>
  )
}

function PrivateRoute({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<'loading' | 'allowed' | 'denied'>('loading')

  useEffect(() => {
    void getLatestMBTI().then((result) => {
      setStatus(result?.mbtiType ? 'allowed' : 'denied')
    })
  }, [])

  if (status === 'loading') {
    return <RouteLoadingSpinner />
  }

  if (status === 'denied') {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

const LandingPage = lazy(() => import('./pages/LandingPage'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Quiz = lazy(() => import('./pages/Quiz'))
const BirthForm = lazy(() => import('./pages/BirthForm'))
const Result = lazy(() => import('./pages/Result'))
const WorkLanding = lazy(() => import('./pages/WorkLanding'))
const WorkProfile = lazy(() => import('./pages/WorkProfile'))
const WorkChat = lazy(() => import('./pages/WorkChat'))
const WorkSettings = lazy(() => import('./pages/WorkSettings'))
const WorkManage = lazy(() => import('./pages/WorkManage'))
const WorkSelf = lazy(() => import('./pages/WorkSelf'))
const WorkSelfBanThan = lazy(() => import('./pages/WorkSelfBanThan'))
const WorkSelfSep = lazy(() => import('./pages/WorkSelfSep'))
const WorkSelfCapDuoi = lazy(() => import('./pages/WorkSelfCapDuoi'))
const WorkSelfDongNghiep = lazy(() => import('./pages/WorkSelfDongNghiep'))
const WorkSelfVaiTro = lazy(() => import('./pages/WorkSelfVaiTro'))
const WorkBusiness = lazy(() => import('./pages/WorkBusiness'))
const WorkKinhDoanh = lazy(() => import('./pages/WorkKinhDoanh'))
const WorkSanTap = lazy(() => import('./pages/WorkSanTap'))
const ArenaSessionPage = lazy(() => import('./pages/ArenaSession'))
const ArenaProgressPage = lazy(() => import('./pages/ArenaProgress'))
const AssistantChat = lazy(() => import('./pages/AssistantChat'))
const PAOnboarding = lazy(() => import('./pages/PAOnboarding'))
const PALanding = lazy(() => import('./pages/PALanding'))
const PADomainSettings = lazy(() => import('./pages/PADomainSettings'))
const PADaily = lazy(() => import('./pages/PADaily'))
const PALegal = lazy(() => import('./pages/PALegal'))
const PAEntertainment = lazy(() => import('./pages/PAEntertainment'))
const PATravel = lazy(() => import('./pages/PATravel'))
const PAHealth = lazy(() => import('./pages/PAHealth'))
const PAStress = lazy(() => import('./pages/PAStress'))
const PAFinance = lazy(() => import('./pages/PAFinance'))
const PASelfDev = lazy(() => import('./pages/PASelfDev'))
const PAFood = lazy(() => import('./pages/PAFood'))
const PASocial = lazy(() => import('./pages/PASocial'))
const PAEnvironment = lazy(() => import('./pages/PAEnvironment'))
const PACulture = lazy(() => import('./pages/PACulture'))
const PAHistory = lazy(() => import('./pages/PAHistory'))
const AssistantGoals = lazy(() => import('./pages/AssistantGoals'))
const AssistantSettings = lazy(() => import('./pages/AssistantSettings'))
const AssistantWeekly = lazy(() => import('./pages/AssistantWeekly'))
const MatchLanding = lazy(() => import('./pages/MatchLanding'))
const MatchProfile = lazy(() => import('./pages/MatchProfile'))
const MatchRelationships = lazy(() => import('./pages/MatchRelationships'))
const MatchVoChong = lazy(() => import('./pages/MatchVoChong'))
const MatchCon = lazy(() => import('./pages/MatchCon'))
const MatchBoMe = lazy(() => import('./pages/MatchBoMe'))
const MatchChat = lazy(() => import('./pages/MatchChat'))
const MatchSanTapLanding = lazy(() => import('./pages/MatchSanTap'))
const MatchSanTap = lazy(() => import('./pages/match/MatchSanTap'))
const LearnLanding = lazy(() => import('./pages/learn/LearnLanding'))
const LearnOnboarding = lazy(() => import('./pages/learn/LearnOnboarding'))
const LearnParentalConsent = lazy(() => import('./pages/learn/LearnParentalConsent'))
const LearnQuiz = lazy(() => import('./pages/LearnQuiz'))
const LearnResult = lazy(() => import('./pages/LearnResult'))
const P2PSetup = lazy(() => import('./pages/P2PSetup'))
const Discover = lazy(() => import('./pages/Discover'))
const MatchesList = lazy(() => import('./pages/MatchesList'))
const P2PChat = lazy(() => import('./pages/P2PChat'))
const InviteLanding = lazy(() => import('./pages/InviteLanding'))
const ComparePage = lazy(() => import('./pages/ComparePage'))
const UnifiedReport = lazy(() => import('./pages/UnifiedReport'))
const Big5Quiz = lazy(() => import('./pages/Big5Quiz'))
const Home = lazy(() => import('./pages/Home'))
const SanTapEntry = lazy(() => import('./pages/SanTapEntry'))
const StartRouting = lazy(() => import('./pages/StartRouting'))

export default function App() {
  return (
    <BrowserRouter>
      <HomeNavProvider>
        <Suspense fallback={<RouteLoadingSpinner />}>
          <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/start" element={<StartRouting />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/quiz/:ageGroup" element={<LearnQuiz />} />
          <Route path="/explore" element={<BirthForm />} />
          <Route path="/result" element={<Result />} />
          <Route path="/report" element={<UnifiedReport />} />
          <Route
            path="/big5"
            element={
              <PrivateRoute>
                <Big5Quiz />
              </PrivateRoute>
            }
          />
          <Route path="/result/:ageGroup" element={<LearnResult />} />
          <Route path="/learn" element={<LearnLanding />} />
          <Route path="/learn/onboarding" element={<LearnOnboarding />} />
          <Route path="/learn/consent" element={<LearnParentalConsent />} />
          <Route path="/san-tap" element={<SanTapEntry />} />
          <Route path="/work" element={<WorkLanding />} />
          <Route path="/work/profile" element={<WorkProfile />} />
          <Route path="/work/chat" element={<WorkChat />} />
          <Route path="/work/settings" element={<WorkSettings />} />
          <Route path="/work/manage" element={<WorkManage />} />
          <Route path="/work/manage/:id" element={<WorkManage />} />
          <Route path="/work/self" element={<WorkSelf />} />
          <Route path="/work/self/ban-than" element={<WorkSelfBanThan />} />
          <Route path="/work/self/sep" element={<WorkSelfSep />} />
          <Route path="/work/self/cap-duoi" element={<WorkSelfCapDuoi />} />
          <Route path="/work/self/dong-nghiep" element={<WorkSelfDongNghiep />} />
          <Route path="/work/self/vai-tro" element={<WorkSelfVaiTro />} />
          <Route path="/work/business" element={<WorkBusiness />} />
          <Route path="/work/san-tap" element={<WorkSanTap />} />
          <Route path="/work/san-tap/arena" element={<ArenaSessionPage />} />
          <Route path="/work/san-tap/progress" element={<ArenaProgressPage />} />
          <Route path="/work/kinh-doanh" element={<WorkKinhDoanh />} />
          <Route path="/assistant" element={<PALanding />} />
          <Route path="/assistant/onboarding" element={<PAOnboarding />} />
          <Route path="/assistant/settings/domains" element={<PADomainSettings />} />
          <Route path="/assistant/daily" element={<PADaily />} />
          <Route path="/assistant/legal" element={<PALegal />} />
          <Route path="/assistant/entertainment" element={<PAEntertainment />} />
          <Route path="/assistant/travel" element={<PATravel />} />
          <Route path="/assistant/health" element={<PAHealth />} />
          <Route path="/assistant/stress" element={<PAStress />} />
          <Route path="/assistant/finance" element={<PAFinance />} />
          <Route path="/assistant/self-dev" element={<PASelfDev />} />
          <Route path="/assistant/food" element={<PAFood />} />
          <Route path="/assistant/social" element={<PASocial />} />
          <Route path="/assistant/environment" element={<PAEnvironment />} />
          <Route path="/assistant/culture" element={<PACulture />} />
          <Route path="/assistant/history" element={<PAHistory />} />
          <Route path="/assistant/chat" element={<AssistantChat />} />
          <Route path="/assistant/goals" element={<AssistantGoals />} />
          <Route path="/assistant/settings" element={<AssistantSettings />} />
          <Route path="/assistant/weekly" element={<AssistantWeekly />} />
          <Route path="/match" element={<MatchLanding />} />
          <Route path="/match/profile" element={<MatchProfile />} />
          <Route path="/match/relationships/vo-chong" element={<MatchVoChong />} />
          <Route path="/match/relationships/con" element={<MatchCon />} />
          <Route path="/match/relationships/bo-me" element={<MatchBoMe />} />
          <Route path="/match/relationships" element={<MatchRelationships />} />
          <Route path="/match/san-tap" element={<MatchSanTapLanding />} />
          <Route path="/match/san-tap/session" element={<MatchSanTap />} />
          <Route path="/match/chat" element={<MatchChat />} />
          <Route path="/profile/setup" element={<P2PSetup />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/matches" element={<MatchesList />} />
          <Route path="/chat/:matchId" element={<P2PChat />} />
          <Route path="/invite/:code" element={<InviteLanding />} />
          <Route path="/compare/:code" element={<ComparePage />} />
          <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <HomeButtonGate />
        <P2PNav />
      </HomeNavProvider>
    </BrowserRouter>
  )
}
