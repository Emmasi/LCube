import Link from 'next/link'
import Logga from '../shared/loggan'

export default function Navigation() {
    return (
        <nav className="flex flex-row justify-between items-center">
            <figure className="hidden md:block flex flex-row justify-between items-center">
                <Link href="/"><Logga /></Link>
            </figure>
            <ul className="flex flex-row justify-between items-center">
                <li className="block md:hidden md:p-10 md:text-2xl p-4 text-4x1 navbar__item font-bold"><Link href="/">LCube</Link></li>
                <li className="md:p-10 md:text-2xl p-4 text-4x1 font-bold navbar__item"><Link href="/blogs">Blogg</Link></li>
                <li className="md:p-10 md:text-2xl p-4 text-4x1 font-bold navbar__item"><Link href="/contact">Kontakta oss</Link></li>
            </ul>
        </nav>
    )
}