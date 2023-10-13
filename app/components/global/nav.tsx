import Link from 'next/link'
import Logga from '../shared/loggan'

export default function Navigation() {
    return (
            <nav className="flex flex-row justify-between items-center">
                <figure className="flex flex-row justify-between items-center">
                    <Link href="./"><Logga /></Link>
                </figure>
                <ul className="flex flex-row justify-between items-center">
                    <li className="md:p-10 text-2xl navbar__item"><Link href="/blogs">Blogg</Link></li>
                    <li className="md:p-10 text-2xl navbar__item"><Link href="/about">Om LCube</Link></li>
                    <li className="md:p-10 text-2xl navbar__item"><Link href="/contact">Kontakta oss</Link></li>
                </ul>
            </nav>
    )
}