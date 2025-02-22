import Link from 'next/link'
import Logga from '../shared/loggan'

export default function Navigation() {
    return (
        <nav className="flex justify-between items-center px-0 md:px-8">
          <ul className="flex items-center space-x-4 md:space-x-6">
            <li className="px-2 py-4 md:text-sm text-4xl hover:text-[#4d7a3d] hover:underline">
              <Link href="/">[ LCube ]</Link>
            </li>
            <li className="px-2 py-4 md:text-sm text-4xl hover:text-[#4d7a3d] hover:underline">
              <Link href="/about">[ About ]</Link>
            </li>
            <li className="px-2 py-4 md:text-sm text-4xl hover:text-[#4d7a3d] hover:underline">
              <Link href="/blogs">[ Blogg ]</Link>
            </li>
            <li className="px-2 py-4 md:text-sm text-4xl hover:text-[#4d7a3d] hover:underline">
              <Link href="/contact">[ Kontakta oss ]</Link>
            </li>
          </ul>
        </nav>
      );
}