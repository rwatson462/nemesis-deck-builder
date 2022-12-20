
export default function TwoColumnLayout({columns}) {
    return (
        <div className="column two-column">
            <div>{columns[0]}</div>
            <div>{columns[1]}</div>
        </div>
    )
}