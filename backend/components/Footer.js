import Link from "next/link";

export default function Footer() {
    return (
        <footer>
            <p><Link href="/">Front page</Link> | <Link href="/news">Latest news</Link></p>
            <p><small>&copy; 2022-{(new Date()).getFullYear()} Rob Watson</small></p>
        </footer>
    )
}