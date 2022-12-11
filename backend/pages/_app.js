import Footer from '../components/Footer'
import NemesisDeckNav from '../components/NemesisDeckNav'
import WarbandNav from '../components/WarbandNav'
import PageHeader from '../components/PageHeader'
import '../scss/default.scss'

export default function App({ Component, pageProps }) {
    return (
      <>
        <PageHeader title={pageProps.title} subtitle={pageProps.subtitle} />
        
        <Component {...pageProps} />

        <WarbandNav warbands={pageProps.warbands} />
        <NemesisDeckNav decks={pageProps.decks} />
        <Footer />
      </>
    )
}
