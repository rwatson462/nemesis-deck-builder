import DeckList from './DeckList'
import { useContext } from 'react'
import DeckContext from '../../Contexts/DeckContext'

export default function UserDeckContainer() {
  const { userDeck } = useContext(DeckContext)

  return (
    <section className='user-deck-container'>
      <DeckList cards={userDeck} />
    </section>
  )
}
