'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function MobileMenu() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="md:hidden py-4">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="focus:outline-none"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {menuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {menuOpen && (
        <nav className="px-8 py-4">
          <ul className="space-y-4">
            <li>
              <Link href="#" className="block hover:text-gray-400">
                LinkedIn
              </Link>
            </li>
            <li>
              <Link href="#" className="block hover:text-gray-400">
                Github
              </Link>
            </li>
            <li>
              <Link href="/" className="block hover:text-gray-400">LCube</Link>
            </li>
            <li>
              <Link href="/about" className="block hover:text-gray-400">About</Link>
            </li>
            <li>
              <Link href="/blogs" className="block hover:text-gray-400">Blogg</Link>
            </li>
            <li>
              <Link href="/contact" className="block hover:text-gray-400">Kontakta oss</Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
