import Image from 'next/image'
import generateImageUrl from '../functions/generateImageUrl'

export default function UnderworldsDbImage({ season, cardName }) {
  const cardFilename = generateImageUrl(cardName)
  return (
    <Image
      src={`https://underworldsdb.com/cards/${season}/${cardFilename}`}
      width='532' height='744'
      alt={cardName}
    />
  )
}
