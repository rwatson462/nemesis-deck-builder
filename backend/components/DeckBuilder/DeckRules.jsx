import RulesList from './Rules/RuleList'

export default function DeckRules({ errors }) {
  const rules = [
    {
      text: 'Must include at least 12 Objectives',
      hasError: errors.includes('obj-12')
    },
    {
      text: 'Cannot include more than 6 Surge Objectives',
      hasError: errors.includes('obj-6')
    },
    {
      text: 'Must include at least 20 Power cards (Gambits + Upgrades)',
      hasError: errors.includes('pwr-20')
    },
    {
      text: 'Cannot include more Gambits than Upgrades',
      hasError: errors.includes('pwr-50')
    }
  ]

  return (
    <div className='deck-rules-container'>
      <p>Rules for building a Nemesis deck:</p>
      <RulesList rules={rules} />
    </div>
  )
}
