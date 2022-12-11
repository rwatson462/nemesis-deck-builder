
export default function CardTitle({card}) {
    return (
        <span className="card-title">
            <span>{card.name}</span><strong>{card.keywords}</strong>
        </span>
    )
}
