import DeckList from "../../components/DeckList"
import createSlug from "../../functions/createSlug"
import { loadNavData } from "../../functions/loadNavData"
import { Warbands } from "../../data/Warbands"
import { Cards } from "../../data/cards"
import HtmlHead from "../../components/HtmlHead"
import { CardTypes } from "../../data/CardTypes"
import { NemesisDecks } from "../../data/NemesisDecks"

export default function WarbandPage({ title, deckType = 'warband', deck = {} }) {
  return (
    <>
      <HtmlHead title={title} />

      {deckType === 'warband' && deck.hasRivalsDeck === 'No' &&
        <p>
          This Warband was released before Rivals existed so 
          it doesn't have a full Rivals deck.  They can still be
          used as part of Nemesis, Championship, or Relic format
          though by adding in other cards.
        </p>
      }
      
      <DeckList cardTypes={CardTypes} cards={deck.cards} warband={deck} />
    </>
  )
}

/**
 * This function is run in advance to figure out what acceptable values there
 * are for [name], then caches the results
 */
export async function getStaticPaths() {
  const paths = [
    ...Warbands.map(warband => (
      {params: {name: createSlug(warband.name)}}
    )),
    ...NemesisDecks.map(deck => (
      {params: {name: createSlug(deck.name)}}
    ))
  ]

  return {
    paths,
    fallback: false
  }
}

/**
 * This function is run in advance to load props to pass to the page component.
 * It is run for each page discovered from getStaticPaths to cache all data
 */
export async function getStaticProps({params}) {
  const deck = {
    ...(
      Warbands.find(warband => createSlug(warband.name) === params.name)
      ?? NemesisDecks.find(deck => createSlug(deck.name) === params.name)
    ),
    cards: Cards.filter(card => createSlug(card.warband) === params.name)
  }

  // Bit of a hack, but this tells us if we're looking at a Rivals deck for a
  // warband or a Nemesis deck that's universal
  const deckType = deck.faction.toLowerCase() !== 'universal'
    ? 'warband'
    : 'nemesis'

  const title = deckType === 'warband'
    ? `Warband: ${deck.name}`
  : `Nemesis Deck: ${deck.name}`

  const subtitle = deckType === 'warband'
    ? deck.faction
    : deck.season

  const navData = loadNavData()

  return {
    props: {
      title,
      subtitle,
      deck,
      deckType,
      ...navData
    }
  }
}
