
export default function CardHeader({ toggleImage, children }) {
  return (
    <div className='card-header' onClick={() => toggleImage()}>
      {children}
    </div>
  )
}
