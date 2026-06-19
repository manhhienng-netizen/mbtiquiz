import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ErrorBoundary from './components/ErrorBoundary.tsx'
import { P2PAuthProvider } from './context/P2PAuthContext.tsx'
import { runP2PHealthCheck } from './lib/p2p/p2p-health-check'

if (import.meta.env.DEV || window.location.hostname.includes('vercel.app')) {
  ;(window as Window & { runP2PHealthCheck?: typeof runP2PHealthCheck }).runP2PHealthCheck =
    runP2PHealthCheck
}

if (import.meta.env.DEV) {
  import('./lib/dev-seed').then((m) => {
    ;(window as Window & { seedTestUser?: typeof m.seedTestUser }).seedTestUser =
      m.seedTestUser
    ;(window as Window & { clearTestUser?: typeof m.clearTestUser }).clearTestUser =
      m.clearTestUser
    console.log('[DEV] Dùng: seedTestUser() | clearTestUser()')
  })

  import('./lib/eval-harness').then((m) => {
    ;(window as Window & { runEval?: typeof m.runEval }).runEval = m.runEval
    console.log(
      '[DEV] Eval: runEval.single() | runEval.crisis() | runEval.scenario() | runEval.comm() | runEval.kb() | runEval.kbLive() | runEval.kbLive("work-comm") | runEval.kbLive("leadership") | runEval.style() | runEval.age() | runEval.workChat() | runEval.workScript(questions, opts) | runEval.workScopeScript() | runEval.paScript("all"|"crisis"|"lifestyle"|"protective"|questions, opts) | runEval.matchScript("all"|"compat"|"friction"|"crisis"|"protective"|questions, opts) | runEval.maScript (=matchScript) | runEval.diagEmpty() | runEval.matchBoundary() — seedTestUser() trước',
    )
  })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <P2PAuthProvider>
        <App />
      </P2PAuthProvider>
    </ErrorBoundary>
  </StrictMode>,
)
