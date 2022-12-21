import ToggleInDeckButton from './ToggleInDeckButton'

export default function AddToDeckButton({ onClick }) {
  return (
    <ToggleInDeckButton onClick={onClick} title='Add to deck'>
    +
    </ToggleInDeckButton>
  )
}
