import Head from "next/head"
import Footer from "../components/Footer"
import NemesisDeckNav from "../components/NemesisDeckNav"
import WarbandNav from "../components/WarbandNav"
import { loadNavData } from "../functions/loadNavData"

export default function NewsPage({title, warbands = [], decks = []}) {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>

            <h1 className="page-title">Nemesis Deck Builder: Latest news</h1>
            <p>
                Check this page to see what's new with the Nemesis Deck builder.
                We're still an early alpha product so this page will be regularly updated with news on what's changing as development progresses.
            </p>

            <article>
                <section className="page-section">
                    <h4 className="underline">1st November 2022</h4>
                    <p>Added deck lists for:</p>
                    <ul>
                        <li>Gnarlspirit Pack</li>
                        <li>Gorechosen of Dromm</li>
                        <li>Hrothgorn's Mantrappers</li>
                    </ul>
                </section>

                <section className="page-section">
                    <h4 className="underline">31st October 2022</h4>
                    <p>Site launched today!  Including deck lists for these warbands:</p>
                    <ul>
                        <li>Steelheart's Champions</li>
                        <li>Garrek's Reavers</li>
                        <li>Sepulchral Guard</li>
                        <li>Chosen Axes</li>
                        <li>Ironskull's Boys</li>
                        <li>Spiteclaw's Swarm</li>
                        <li>Magore's Fiends</li>
                        <li>Farstriders</li>
                        <li>Rippa's Snarlfangs</li>
                        <li>Sons of Velmorn</li>
                    </ul>
                    <p>And these Nemesis decks:</p>
                    <ul>
                        <li>Illusory Might</li>
                        <li>Deadly Depths</li>
                        <li>Daring Delvers</li>
                        <li>Tooth and Claw</li>
                    </ul>
                    <p>
                        Plus an early look at how the deck builder will work eventually.
                        You can choose a Warband and Rivals deck from the main page then add/remove cards from your final deck.
                        The decks aren't saved anywhere yet - if you refresh the page they're gone - so watch out for that.
                    </p>
                </section>
            </article>

            <WarbandNav warbands={warbands} />
            <NemesisDeckNav decks={decks} />
            <Footer />
        </>
    )
}

export async function getStaticProps() {
    const navData = await loadNavData()
    
    return {
        props: {
            title: 'Nemesis Deck Builder: Latest news',
            ...navData
        }
    }
}