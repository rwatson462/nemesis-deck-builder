import { useRouter } from 'next/router'
import { useRef } from 'react'
import createSlug from '../functions/createSlug'

export default function WarbandSelector({ warbands, decks }) {
  const router = useRouter()

  const warbandSelect = useRef()
  const deckSelect = useRef()

  const start = () => {
    const warband = warbandSelect.current.value
    const deck = deckSelect.current.value

    if (warband === '' || deck === '') {
      return
    }

    router.push(`/deck-builder/${createSlug(warband)}/${createSlug(deck)}/`)
  }

  return (
    <section className='warband-selector-container'>
      <select ref={warbandSelect} defaultValue=''>
        <option value='' disabled>Select a Warband</option>
        { warbands.sort((a,b) => a.name.localeCompare(b.name)).map((warband,key) => (
          <option key={key}>{warband.name}</option>
        ))}
      </select>

      <select ref={deckSelect} defaultValue=''>
        <option value='' disabled>Select a Deck</option>
        { decks.sort((a,b) => a.name.localeCompare(b.name)).map((deck,key) => (
          <option key={key}>{deck.name}</option>
        ))}
      </select>

      <button onClick={start}>Go...</button>
    </section>
  )
}
