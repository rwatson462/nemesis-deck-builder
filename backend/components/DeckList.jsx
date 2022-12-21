import CardList from './CardList'

export default function DeckList({ cardTypes, cards, type='horizontal' }) {
  const sortedCards = cards.sort((a,b) => a.name.localeCompare(b.name))
  return (
    <div className={`deck-container deck-container-${type}`}>
      {cardTypes.map((cardType,key) => (
        <CardList
          title={cardType}
          cards={sortedCards.filter(card => card.type === cardType)}
          key={key}
        />
      ))}
    </div>
  )
}
