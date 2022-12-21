import { useState } from 'react'
import DeckContext from '../Contexts/DeckContext'

export default function DeckProvider({ children }) {
  const [ userDeck, setUserDeck ] = useState([])

  const toggleCardInUserDeck = (card) => {
    if (userDeck.filter(userCard => userCard.name === card.name).length > 0) {
      setUserDeck(userDeck.filter(userCard => userCard.name !== card.name))
    } else {
      setUserDeck([ ...userDeck, card ])
    }
  }

  const isInUserDeck = (card) => (
    userDeck.filter(userCard => userCard.name === card.name).length > 0
  )

  const deckContext = {
    userDeck,
    isInUserDeck,
    toggleCardInUserDeck
  }

  return (
    <DeckContext.Provider value={deckContext}>
      {children}
    </DeckContext.Provider>
  )
}
