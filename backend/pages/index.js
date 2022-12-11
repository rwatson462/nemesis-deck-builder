import { loadNavData } from '../functions/loadNavData'
import WarbandSelector from '../components/WarbandSelector'
import ExternalLink from '../components/ExternalLink'
import HtmlHead from '../components/HtmlHead'
import PageHeader from '../components/PageHeader'

export default function IndexPage({title, warbands, decks}) {
  return <>
    <HtmlHead title={title} />
    
    <article>
      <section className="page-section">
        <p>
          Welcome to the Underworlds <strong>Nemesis Deck Builder</strong>.
          This app aims to provide you with an easy to use tool to create and manage decks for <ExternalLink href="https://www.warhammerunderworlds.com" target="_blank">Warhammer Underworlds</ExternalLink>.
          If you need an app that works for all play formats of Underworlds, see <ExternalLink href="https://underworldsdb.com" target="_blank">UnderworldsDB</ExternalLink> - they have far more than I've put together here.
        </p>
        <p>
          So, why use <strong>Nemesis Deck Builder</strong>?
          This app aims to be:
        </p>
        <ul>
          <li><em>fast</em> - fast to load and use,</li>
          <li><em>simple</em> - only a small set of features mean it won't be confusing to use</li>
        </ul>
        <p>
          That's it.
        </p>
      </section>

      <section className="page-section">
        <h3>Get started</h3>
        <p>To use the deck builder, just choose a Warband and a Nemesis deck and get stuck in</p>

        <WarbandSelector warbands={warbands} decks={decks} />
      </section>

      <section className="page-section">
        <h3>Further reading</h3>
        <p>Games Workshop have extensive <ExternalLink href="https://www.warhammer-community.com/faqs/#warhammer-underworlds">Frequently Asked Questions</ExternalLink> along with <ExternalLink href="https://www.warhammer-community.com/downloads/#warhammer-underworlds">all official Play Formats</ExternalLink></p>

        <p>I've also put together the lists of all warbands and universal Rivals decks below</p>
      </section>
    </article>
  </>
}

export async function getStaticProps() {
  const navData = loadNavData()
  
  return {
    props: {
      title: 'Nemesis Deck Builder',
      ...navData
    }
  }
}