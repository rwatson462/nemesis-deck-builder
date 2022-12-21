
export default function validateNemesisDeck(deck) {
  const errors = []

  if (deck.filter(card => card.type === 'Objective').length < 12) {
    errors.push('obj-12')
  }

  if (deck.filter(card => card.type === 'Objective' && card.keywords?.includes('Surge')).length > 6) {
    errors.push('obj-6')
  }

  if (deck.filter(card => [ 'Gambit', 'Upgrade' ].includes(card.type)).length < 20) {
    errors.push('pwr-20')
  }
  
  if (deck.filter(card => card.type === 'Gambit').length > deck.filter(card => card.type === 'Upgrade').length) {
    errors.push('pwr-50')
  }

  return errors
}
