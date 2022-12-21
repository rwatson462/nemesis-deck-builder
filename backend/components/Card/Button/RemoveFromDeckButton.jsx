import ToggleInDeckButton from './ToggleInDeckButton'

export default function RemoveFromDeckButton({ onClick }) {
  return (
    <ToggleInDeckButton onClick={onClick} title='Remove from deck'>
    -
    </ToggleInDeckButton>
  )
}
