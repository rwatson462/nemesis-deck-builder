import Card from './Card/Card'

export default function CardList({ title, cards }) {
  return (
    <section className='deck-group'>
      <h4><span>{title}</span><span>({cards.length})</span></h4>
      {cards.map((card) => (
        <Card card={card} key={card.name} />
      ))}
    </section>
  )
}
