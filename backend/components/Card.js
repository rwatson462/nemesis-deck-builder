import { useState } from "react";
import UnderworldsDbImage from "./UnderworldsDbImage";

export default function Card({warband, card}) {
    const [showImage, setShowImage] = useState(false)

    return (
        <>
            <span onClick={e => setShowImage(v => !v)} className="card-text">
                <span>{card.name}</span><strong>{card.keywords}</strong>
            </span>
            { showImage && <UnderworldsDbImage season={warband.season} card={card} /> }
        </>
    )
}
