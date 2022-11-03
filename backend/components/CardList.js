import Card from "./Card";

export default function CardList({ title, warband, cards }) {
    return (
        <section className="deck-group">
            <h4><span>{title}</span><span>({cards.length})</span></h4>
            <ul className="list-group">
                {cards.map((card,key) => (
                    <li key={key}>
                        <Card card={card} warband={warband} />
                    </li>
                ))}
            </ul>
        </section>
    )
}
