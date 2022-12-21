import { useState } from 'react'
import { Cards } from '../../data/cards'
import { CardTypes } from '../../data/CardTypes'
import { loadNavData } from '../../functions/loadNavData'
import { NemesisDecks } from '../../data/NemesisDecks'
import { Warbands } from '../../data/Warbands'
import createSlug from '../../functions/createSlug'
import DeckBuilderInstructions from '../../components/DeckBuilder/DeckBuilderInstructions'
import DeckRules from '../../components/DeckBuilder/DeckRules'
import HtmlHead from '../../components/HtmlHead'
import TwoColumnLayout from '../../components/Layouts/TwoColumnLayout'
import UserDeckContainer from '../../components/DeckBuilder/UserDeckContainer'
import DeckList from '../../components/DeckBuilder/DeckList'
import DeckProvider from '../../Providers/DeckProvider'

export default function Page({ warband, deck }) {
  return <>
    <HtmlHead title='Nemesis Deck Builder' />

    <DeckProvider>
      <DeckRules />

      <UserDeckContainer />

      <DeckBuilderInstructions />

      <TwoColumnLayout
        columns={[
          <>
            <h4 className='deck-title'>{warband.name}</h4>
            <DeckList cardTypes={CardTypes} cards={warband.cards} vertical />
          </>,

          <>
            <h4 className='deck-title'>{deck.name}</h4>
            <DeckList cardTypes={CardTypes} cards={deck.cards} vertical />
          </>
        ]}
      />
    </DeckProvider>
  </>
}

export async function getStaticPaths() {
  // total number of routes = warbands x decks

  const paths = Warbands.reduce(
    (acc, warband) => (
      [ ...acc, ...NemesisDecks.map(deck => (
        {
          params: {
            data: [ createSlug(warband.name), createSlug(deck.name) ]
          }
        }
      )) ]
    ),
    []
  )

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const [ warbandName, deckName ] = params.data

  const navData = loadNavData()

  const warbandData = Warbands.find(warband => createSlug(warband.name) === warbandName)
  const deckData = NemesisDecks.find(deck => createSlug(deck.name) === deckName)

  warbandData.cards = Cards.filter(card => createSlug(card.warband) === warbandName)
  deckData.cards = Cards.filter(card => createSlug(card.warband) === deckName)

  return {
    props: {
      title: 'Nemesis Deck Builder',
      subtitle: `${warbandData.name} / ${deckData.name}`,
      warband: warbandData,
      deck: deckData,
      ...navData
    }
  }
}
