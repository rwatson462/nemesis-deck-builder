import RuleItem from "./RuleItem";

export default function RulesList({ rules = [] }) {
  return (
    <ul>
      {rules.map((rule, key) => (
        <RuleItem rule={rule} key={key} />
      ))}
    </ul>
  )
}
