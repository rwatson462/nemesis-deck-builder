import { useState } from "react";
import CardTitle from "./CardTitle";
import CardHeader from "./CardHeader";
import AddToDeckIcon from "./AddToDeckIcon";
import CardImage from "./CardImage";

export default function Card({card, showToggleCardButton}) {
    const [showImage, setShowImage] = useState(false)

    return (
        <div className="card">
            <CardHeader toggleImage={() => setShowImage(v => !v)}>
                <CardTitle card={card} />
                { showToggleCardButton && <AddToDeckIcon /> }
            </CardHeader>
            <CardImage season={card.season} cardName={card.name} showImage={showImage} />
        </div>
    )
}
