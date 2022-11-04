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
import { Warbands } from "../../data/Warbands"
import { NemesisDecks } from "../../data/NemesisDecks"
import { Cards } from "../../data/cards"
import Footer from "../../components/Footer"

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

            <Footer />
        </>
    )
}

export async function getStaticPaths() {
    const warbands = Warbands.map(warband => ({
        name: warband.name,
        faction: warband.faction,
        url: `/warbands/${createSlug(warband.name)}`
    }))

    const decks = NemesisDecks.map(deck => ({
        name: deck.name,
        faction: deck.faction,
        url: `/nemesis-decks/${createSlug(deck.name)}`
    }))

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
    const [warbandName, deckName] = params.data

    const navData = await loadNavData()

    const warbandData = Warbands.find(warband => createSlug(warband.name) === warbandName)
    const deckData = NemesisDecks.find(deck => createSlug(deck.name) === deckName)

    warbandData.cards = Cards.filter(card => createSlug(card.warband) === warbandName)
    deckData.cards = Cards.filter(card => createSlug(card.warband) === deckName)

    return {
        props: {
            warband: warbandData,
            deck: deckData,
            ...navData
        }
    }
}