import { useRouter } from 'next/router'
import Link from 'next/link'

export default function NemesisDeckNav({ decks = [] }) {
  const { asPath: path } = useRouter()
  const sortedDecks = decks.sort((a,b) => a.name.localeCompare(b.name))

  return <>
    <nav className='warband-nav single-column'>
      <section>
        <p>Universal Rivals decks</p>
        <ul className='list-group'>
          {sortedDecks.map((deck,key) => (
            <li key={key}>
              {deck.url === path
                ? <span>{deck.name}</span>
                : <Link href={deck.url}>{deck.name}</Link>
              }
            </li>
          ))
          }
        </ul>
      </section>
    </nav>
  </>
}
