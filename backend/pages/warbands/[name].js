import Head from "next/head"
import CardList from "../../components/CardList"
import HorizontalDecklist from "../../components/HorizontalDecklist"
import Footer from "../../components/Footer"
import NemesisDeckNav from "../../components/NemesisDeckNav"
import WarbandNav from "../../components/WarbandNav"
import createSlug from "../../functions/createSlug"
import { loadNavData } from "../../functions/loadNavData"
import { Warbands } from "../../data/Warbands"
import { Cards } from "../../data/cards"

export default function WarbandPage({warband = {}, warbands = [], decks = []}) {
    const title = `Warband: ${warband.name}`
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
                {warband.hasRivalsDeck === 'No' &&
                    <p>
                        This Warband was released before Rivals existed so 
                        it doesn't have a full Rivals deck.  They can still be
                        used as part of Nemesis, Championship, or Relic format
                        though by adding in other cards.
                    </p>
                }

                <HorizontalDecklist>
                    {['Objective', 'Gambit', 'Upgrade'].map((cardType,key) => (
                        <CardList
                            title={cardType}
                            cards={warband.cards.filter(card => card.type === cardType).sort((a,b) => a.name.localeCompare(b.name))}
                            warband={warband}
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
    const paths = Warbands.map(warband => (
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
    const warband = Warbands.find(warband => createSlug(warband.name) === params.name)
    const cards = Cards.filter(card => createSlug(card.warband) === params.name)

    warband.cards = cards

    const navData = await loadNavData()

    return {
        props: {
            warband,
            ...navData
        }
    }
}
