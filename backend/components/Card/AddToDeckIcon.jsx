import { useContext } from 'react'
import DeckContext from '../../Contexts/DeckContext'
import AddToDeckButton from './Button/AddToDeckButton'
import RemoveFromDeckButton from './Button/RemoveFromDeckButton'

export default function AddToDeckIcon({ card }) {
  const { isInUserDeck, toggleCardInUserDeck } = useContext(DeckContext)

  const toggleCardInDeck = e => {
    e.preventDefault()
    e.stopPropagation()

    toggleCardInUserDeck(card)

    return false
  }

  const cardInDeck = isInUserDeck(card)

  return (
    cardInDeck
      ? <RemoveFromDeckButton onClick={toggleCardInDeck} />
      : <AddToDeckButton onClick={toggleCardInDeck} />
  )
}
