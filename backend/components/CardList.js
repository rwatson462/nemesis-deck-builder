
export default function CardList({ title, cards }) {
    return (
        <section className="deck-group">
            <h4><span>{title}</span><span>({cards.length})</span></h4>
            <ul className="list-group">
                {cards.map((card,key) => (
                    <li key={key}><span>{card.name}</span><strong>{card.keywords}</strong></li>
                ))}
            </ul>
        </section>
    )
}
