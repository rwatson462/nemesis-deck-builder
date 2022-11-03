import Image from "next/image";
import generateImageUrl from "../functions/generateImageUrl";

export default function UnderworldsDbImage({season, card}) {
    const cardFilename = generateImageUrl(card.name)
    return (
        <span className="card-image-container">
            <Image src={`https://underworldsdb.com/cards/${season}/${cardFilename}`} width="532" height="744" />
        </span>
    )
}
