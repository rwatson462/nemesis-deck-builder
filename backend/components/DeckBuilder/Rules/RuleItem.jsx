
export default function RuleItem({ rule: { text, hasError } }) {
  return (
    <li className={hasError && 'has-error'}>{text}</li>
  )
}
