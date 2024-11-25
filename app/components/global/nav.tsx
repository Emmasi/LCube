import Link from 'next/link'
import Logga from '../shared/loggan'

export default function Navigation() {
    return (
        <nav className="flex flex-row justify-between items-center px-0 md:px-8">
            <figure className="hidden md:block flex flex-row justify-between items-center">
                <Link href="/"><Logga /></Link>
            </figure>
            <ul className="flex flex-row justify-between items-center">
                <li className="block md:hidden md:p-6 md:text-2xl p-4 text-4x1 navbar__item"><Link href="/">LCube</Link></li>
                <li className="md:p-6 md:text-2xl p-4 text-4x1 navbar__item"><Link href="/about">Home</Link></li>
                <li className="md:p-6 md:text-2xl p-4 text-4x1 navbar__item"><Link href="/blogs">Blogg</Link></li>
                <li className="md:p-6 md:text-2xl p-4 text-4x1 navbar__item"><Link href="/contact">Kontakta oss</Link></li>
            </ul>
        </nav>
    )
}