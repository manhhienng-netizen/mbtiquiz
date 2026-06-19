const MATCH_AGE_GATE_KEY = 'tncb_match_age_gate_confirmed'

export function isMatchAgeGateConfirmed(): boolean {
  try {
    return localStorage.getItem(MATCH_AGE_GATE_KEY) === '1'
  } catch {
    return false
  }
}

export function confirmMatchAgeGate(): void {
  localStorage.setItem(MATCH_AGE_GATE_KEY, '1')
}
