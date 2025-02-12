import Link from 'next/link'
import Logga from '../shared/loggan'

export default function Navigation() {
    return (
        <nav className="flex justify-between items-center px-0 md:px-8">
          <figure className="hidden md:block">
            <Link href="/"><Logga /></Link>
          </figure>
          <ul className="flex items-center space-x-4 md:space-x-6">
            <li className="block md:hidden p-4 md:p-6 md:text-2xl text-4xl">
              <Link href="/">LCube</Link>
            </li>
            <li className="px-2 py-4 md:text-base text-4xl">
              <Link href="/about">About</Link>
            </li>
            <li className="px-2 py-4 md:text-base text-4xl">
              <Link href="/blogs">Blogg</Link>
            </li>
            <li className="px-2 py-4 md:text-base text-4xl">
              <Link href="/contact">Kontakta oss</Link>
            </li>
          </ul>
        </nav>
      );
}