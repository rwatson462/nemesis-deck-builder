import CardList from './CardList'

export default function DeckList({ cardTypes, cards, vertical }) {
  const sortedCards = cards.sort((a,b) => a.name.localeCompare(b.name))

  return (
    <div className={`deck-container deck-container-${vertical ? 'vertical' : 'horizontal'}`}>
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
