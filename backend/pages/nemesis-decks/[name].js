import Head from "next/head"
import CardList from "../../components/CardList"
import HorizontalDecklist from "../../components/HorizontalDecklist"
import Footer from "../../components/Footer"
import NemesisDeckNav from "../../components/NemesisDeckNav"
import WarbandNav from "../../components/WarbandNav"
import createSlug from "../../functions/createSlug"
import { loadNavData } from "../../functions/loadNavData"

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
    const res = await fetch('http://backend:3000/api/nemesis-decks/all')

    const warbands = await res.json()

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
    const response = await fetch(`http://backend:3000/api/nemesis-decks/${params.name}`)
    const deck = await response.json()

    const cardResponse = await fetch(`http://backend:3000/api/cards/${params.name}`)
    const cards = await cardResponse.json()
    
    deck.cards = cards.cards

    const navData = await loadNavData()

    return {
        props: {
            deck,
            ...navData
        }
    }
}
