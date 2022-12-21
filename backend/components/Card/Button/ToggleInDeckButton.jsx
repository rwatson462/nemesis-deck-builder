
export default function ToggleInDeckButton({ onClick, title, children }) {
  return (
    <span
      onClick={onClick}
      className='add-to-deck-icon'
      title={title}
    >
      {children}
    </span>
  )
}
