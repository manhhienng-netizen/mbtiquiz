import { useEffect, useState } from 'react'
import {
  getCurrentCharacter,
  getMBTIHistory,
  getSpiritualResult,
  type CurrentCharacterRecord,
  type MBTIRecord,
  type SpiritualRecord,
} from '../db/tncb-db'

export function useTNCBData() {
  const [mbtiHistory, setMbtiHistory] = useState<MBTIRecord[]>([])
  const [spiritual, setSpiritual] = useState<SpiritualRecord | null>(null)
  const [character, setCharacter] = useState<CurrentCharacterRecord | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const [history, sp, ch] = await Promise.all([
        getMBTIHistory(),
        getSpiritualResult(),
        getCurrentCharacter(),
      ])
      setMbtiHistory(history)
      setSpiritual(sp ?? null)
      setCharacter(ch ?? null)
      setLoading(false)
    }
    void load()
  }, [])

  return { mbtiHistory, spiritual, character, loading }
}
