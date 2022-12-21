import { useState } from 'react'
import { Cards } from '../../data/cards'
import { CardTypes } from '../../data/CardTypes'
import { loadNavData } from '../../functions/loadNavData'
import { NemesisDecks } from '../../data/NemesisDecks'
import { Warbands } from '../../data/Warbands'
// import ClickableCardList from '../../components/ClickableCardList'
import createSlug from '../../functions/createSlug'
import DeckBuilderInstructions from '../../components/DeckBuilder/DeckBuilderInstructions'
import DeckRules from '../../components/DeckBuilder/DeckRules'
import HtmlHead from '../../components/HtmlHead'
import TwoColumnLayout from '../../components/Layouts/TwoColumnLayout'
import UserDeckContainer from '../../components/DeckBuilder/UserDeckContainer'
import validateNemesisDeck from '../../functions/validateNemesisDeck'
// import VerticalDeckContainer from '../../components/VerticalDeckContainer'
import DeckList from '../../components/DeckList'

export default function Page({ warband, deck }) {
  const [ userDeck, setUserDeck ] = useState([])

  const toggleCardInUserDeck = (card) => {
    if (userDeck.filter(userCard => userCard.name === card.name).length > 0) {
      setUserDeck(userDeck.filter(userCard => userCard.name !== card.name))
    } else {
      setUserDeck([ ...userDeck, card ])
    }
  }

  // eslint-disable-next-line
  const isInUserDeck = (card) => (
    userDeck.filter(userCard => userCard.name === card.name).length > 0
  )

  const errors = validateNemesisDeck(userDeck)

  return <>
    <HtmlHead title='Nemesis Deck Builder' />

    <DeckRules errors={errors} />

    <UserDeckContainer
      userDeck={userDeck}
      toggleCardInUserDeck={toggleCardInUserDeck}
    />

    <DeckBuilderInstructions />

    <TwoColumnLayout
      columns={[
        <>
          <h4 className='deck-title'>{warband.name}</h4>
          <DeckList cardTypes={CardTypes} cards={warband.cards} type='vertical' />
        </>,

        <>
          <h4 className='deck-title'>{deck.name}</h4>
          <DeckList cardTypes={CardTypes} cards={deck.cards} type='vertical' />
        </>
      ]}
    />
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
