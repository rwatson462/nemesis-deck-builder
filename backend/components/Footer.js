import Link from "next/link";

export default function Footer() {
    const siteLinks = [
        {
            url: '/',
            text: 'Front Page'
        },
        {
            url: '/news',
            text: 'Latest news'
        }
    ]

    return (
        <footer>
            <p>
                <ul>
                    {siteLinks.map((link,key) => (
                        <li key={key}>
                            <Link href={link.url}>{link.text}</Link>
                        </li>
                    ))}
                </ul>
            </p>
            <p><small>&copy; 2022-{(new Date()).getFullYear()} Rob Watson</small></p>
        </footer>
    )
}
