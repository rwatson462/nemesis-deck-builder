
export default function validateNemesisDeck(deck) {
    const errors = {}

    if (deck.filter(card => card.type === 'Objective').length < 12) {
        errors.obj1 = 'Objective deck must have at least 12 cards'
    }

    if (deck.filter(card => card.type === 'Objective' && card.keywords?.includes('Surge')).length > 6) {
        errors.obj2 = 'Objective deck cannot include more than 6 Surge objectives'
    }

    if (deck.filter(card => ['Gambit','Upgrade'].includes(card.type)).length < 20) {
        errors.pwr1 = 'Power deck must include at least 20 cards'
    }
    
    if (deck.filter(card => card.type === 'Gambit').length > deck.filter(card => card.type === 'Upgrade').length) {
        errors.pwr2 = 'Power deck cannot include more Gambits than Upgrades'
    }

    return errors
}
