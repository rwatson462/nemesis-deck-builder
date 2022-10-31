import Head from "next/head"
import CardList from "../../components/CardList"
import HorizontalDecklist from "../../components/HorizontalDecklist"
import Footer from "../../components/Footer"
import NemesisDeckNav from "../../components/NemesisDeckNav"
import WarbandNav from "../../components/WarbandNav"
import createSlug from "../../functions/createSlug"
import { loadNavData } from "../../functions/loadNavData"
import { NemesisDecks } from "../../data/NemesisDecks"
import { Cards } from "../../data/cards"

export default function WarbandPage({deck = {}, warbands = [], decks = []}) {
    const title = `Nemesis Deck: ${deck.name}`
    /**
     * This is standard React code that's run in the front end, it should be
     * used to fetch additional high-velocity data once the main page has been
     * rendered on the server
     */

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>

            <h1 className="page-title">{title}</h1>
            <article>
                <HorizontalDecklist>
                    {['Objective', 'Gambit', 'Upgrade'].map((cardType,key) => (
                        <CardList
                            title={cardType}
                            cards={deck.cards.filter(card => card.type === cardType).sort((a,b) => a.name.localeCompare(b.name))}
                            key={key}
                        />
                    ))}
                </HorizontalDecklist>
            </article>

            <WarbandNav warbands={warbands} />
            <NemesisDeckNav decks={decks} />
            <Footer />
        </>
    )
}

/**
 * This function is run in advance to figure out what acceptable values there
 * are for [name], then caches the results
 */
export async function getStaticPaths() {
    const warbands = NemesisDecks.map(deck => ({
        name: deck.name,
        faction: deck.faction,
        url: `/nemesis-decks/${createSlug(deck.name)}`
    }))

    const paths = warbands.map(warband => (
        {params: {name: createSlug(warband.name)}}
    ))

    return {
        paths,
        fallback: false
    }
}

/**
 * This function is run in advance to load props to pass to the page component.
 * It is run for each page discovered from getStaticPaths to cache all data
 */
export async function getStaticProps({params}) {
    const deck = NemesisDecks.find(deck => createSlug(deck.name) === params.name)
    const cards = Cards.filter(card => createSlug(card.warband) === params.name)
    
    deck.cards = cards

    const navData = await loadNavData()

    return {
        props: {
            deck,
            ...navData
        }
    }
}
