import UnderworldsDbImage from '../UnderworldsDbImage'

export default function CardImage({ season, cardName, showImage }) {
  return showImage && (
    <div className='card-image'>
      <UnderworldsDbImage season={season} cardName={cardName} />
    </div>
  )
}
