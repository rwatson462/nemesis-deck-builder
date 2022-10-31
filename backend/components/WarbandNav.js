import { useRouter } from 'next/router'
import Link from 'next/link'

export default function WarbandNav({warbands = []}) {
    const {asPath: path} = useRouter()

    const factions = ['Chaos', 'Death', 'Destruction', 'Order']

    return <>
        <nav className="warband-nav">
            {factions.map((faction,key) => (
                <section key={key}>
                    <p>{faction}</p>
                    <ul className="list-group">
                        {warbands
                            .filter(warband => warband.faction === faction)
                            .sort((a,b) => a.name.localeCompare(b.name))
                            .map((warband,key) => (
                                <li key={key}>
                                    {warband.url === path
                                        ? <span>{warband.name}</span>
                                        : <Link href={warband.url}>{warband.name}</Link>
                                }
                                </li>
                            ))
                        }
                    </ul>
                </section>
            ))}
        </nav>
    </>
}
