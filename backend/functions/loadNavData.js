import { Warbands } from '../data/Warbands'
import { NemesisDecks } from '../data/NemesisDecks'
import createSlug from './createSlug'

export function loadNavData() {
  const warbandData = Warbands.map(warband => ({
    name: warband.name,
    faction: warband.faction,
    url: `/decks/${createSlug(warband.name)}`
  }))

  const deckData = NemesisDecks.map(deck => ({
    name: deck.name,
    faction: deck.faction,
    url: `/decks/${createSlug(deck.name)}`
  }))

  return {
    warbands: warbandData,
    decks: deckData,
  }
}
