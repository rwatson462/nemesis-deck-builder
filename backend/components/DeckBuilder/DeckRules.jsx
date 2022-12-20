export default function DeckRules({errors}) {
    return (
        <div className="deck-rules-container">
            <p>Rules for building a Nemesis deck:</p>
            <ul>
                <li className={errors.obj1 && 'has-error'}>Must include at least 12 Objectives</li>
                <li className={errors.obj2 && 'has-error'}>Cannot include more than 6 Surge Objectives</li>
                <li className={errors.pwr1 && 'has-error'}>Must include at least 20 Power cards (Gambits + Upgrades)</li>
                <li className={errors.pwr2 && 'has-error'}>Cannot include more Gambits than Upgrades</li>
            </ul>
        </div>
    )
}
