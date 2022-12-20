import { CardTypes } from "../../data/CardTypes";
import CardList from "../CardList";
import ClickableCardList from "../ClickableCardList";
import DeckList from "../DeckList";

export default function UserDeckContainer({userDeck, toggleCardInUserDeck}) {
    return (
        <section className="user-deck-container">
            {/* <DeckList>
                {CardTypes.map((cardType,key) => (
                    <ClickableCardList
                        key={key}
                        title={cardType}
                        cards={userDeck.filter(card => card.type === cardType).sort((a,b) => a.name.localeCompare(b.name))}
                        onClick={toggleCardInUserDeck}
                        isActiveClassCallback={() => false}
                    />
                ))}
            </DeckList> */}
        </section>
    )
}
