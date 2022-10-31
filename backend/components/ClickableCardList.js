
export default function ClickableCardList({title, cards, onClick, isActiveClassCallback}) {
    return (
        <section className="deck-group with-links">
            <h4><span>{title}</span><span>({cards.length})</span></h4>
            <ul className="list-group">
                {cards.map((card,key) => (
                    <li key={key} onClick={e => onClick(card)} className={isActiveClassCallback(card) ? 'in-user-deck' : ''}>
                        <span >{card.name}</span><strong>{card.keywords}</strong>
                    </li>
                ))}
            </ul>
        </section>
    )
}
