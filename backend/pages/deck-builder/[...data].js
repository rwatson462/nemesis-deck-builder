import { useState } from "react"
import VerticalDeckContainer from "../../components/VerticalDeckContainer"
import HorizontalDecklist from "../../components/HorizontalDecklist"
import createSlug from "../../functions/createSlug"
import { loadNavData } from "../../functions/loadNavData"
import WarbandNav from "../../components/WarbandNav"
import NemesisDeckNav from "../../components/NemesisDeckNav"
import ClickableCardList from "../../components/ClickableCardList"
import { CardTypes } from "../../data/CardTypes"
import validateNemesisDeck from "../../functions/validateNemesisDeck"

export default function Page({warband, deck, warbands, decks}) {
    const [userDeck, setUserDeck] = useState([])

    const toggleCardInUserDeck = (card) => {
        if (userDeck.filter(userCard => userCard.name === card.name).length > 0) {
            setUserDeck(userDeck.filter(userCard => userCard.name !== card.name))
        } else {
            setUserDeck([...userDeck, card])
        }
    }

    const isInUserDeck = (card) => (
        userDeck.filter(userCard => userCard.name === card.name).length > 0
    )

    const errors = validateNemesisDeck(userDeck)

    return (
        <>
            <h1>Nemesis Deck Builder</h1>
            <h2>{warband.name} / {deck.name}</h2>
            <p>Rules for building a Nemesis deck:</p>
            <ul>
                <li className={errors.obj1 && 'has-error'}>Must include at least 12 Objectives</li>
                <li className={errors.obj2 && 'has-error'}>Cannot include more than 6 Surge Objectives</li>
                <li className={errors.pwr1 && 'has-error'}>Must include at least 20 Power cards (Gambits + Upgrades)</li>
                <li className={errors.pwr2 && 'has-error'}>Cannot include more Gambits than Upgrades</li>
            </ul>

            <section className="user-deck-container">
                <HorizontalDecklist>
                    {CardTypes.map((cardType,key) => (
                        <ClickableCardList
                            key={key}
                            title={cardType}
                            cards={userDeck.filter(card => card.type === cardType).sort((a,b) => a.name.localeCompare(b.name))}
                            onClick={toggleCardInUserDeck}
                            isActiveClassCallback={() => false}
                        />
                    ))}
                </HorizontalDecklist>
            </section>

            <p>Build your deck by selecting cards from below.  Click a card to add it to the deck above</p>

            <div className="column two-column">
                <div>
                    <h4 className="deck-title">{warband.name}</h4>
                    <VerticalDeckContainer>
                        {CardTypes.map((cardType,key) => (
                            <ClickableCardList
                                key={key}
                                title={cardType}
                                cards={warband.cards.filter(card => card.type === cardType).sort((a,b) => a.name.localeCompare(b.name))}
                                onClick={toggleCardInUserDeck}
                                isActiveClassCallback={isInUserDeck}
                            />
                        ))}
                    </VerticalDeckContainer>
                </div>

                <div>
                    <h4 className="deck-title">{deck.name}</h4>
                    <VerticalDeckContainer>
                        {CardTypes.map((cardType,key) => (
                            <ClickableCardList
                                key={key}
                                title={cardType}
                                cards={deck.cards.filter(card => card.type === cardType).sort((a,b) => a.name.localeCompare(b.name))}
                                onClick={toggleCardInUserDeck}
                                isActiveClassCallback={isInUserDeck}
                            />
                        ))}
                    </VerticalDeckContainer>
                </div>
            </div>

            <WarbandNav warbands={warbands} />
            <NemesisDeckNav decks={decks} />
        </>
    )
}

export async function getStaticPaths() {
    const warbandsResponse = await fetch('http://localhost:3000/api/warbands/all')
    const warbands = await warbandsResponse.json()

    const decksResponse = await fetch('http://localhost:3000/api/nemesis-decks/all')
    const decks = await decksResponse.json()

    const paths = []
    warbands.map(warband => decks.map(deck => {
        paths.push({params: {
            data: [createSlug(warband.name), createSlug(deck.name)]
        }})
    }))

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({params}) {
    const [warband, deck] = params.data

    const navData = await loadNavData()

    const warbandResponse = await fetch(`http://localhost:3000/api/warbands/${warband}`)
    const warbandData = await warbandResponse.json()

    const deckResponse = await fetch(`http://localhost:3000/api/nemesis-decks/${deck}`)
    const deckData = await deckResponse.json()

    const warbandCardResponse = await fetch(`http://backend:3000/api/cards/${createSlug(warbandData.name)}`)
    const warbandCards = await warbandCardResponse.json()
    warbandData.cards = warbandCards.cards

    const nemesisCardResponse = await fetch(`http://backend:3000/api/cards/${createSlug(deckData.name)}`)
    const nemesisCards = await nemesisCardResponse.json()
    deckData.cards = nemesisCards.cards

    return {
        props: {
            warband: warbandData,
            deck: deckData,
            ...navData
        }
    }
}