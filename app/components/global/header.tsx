import dynamic from 'next/dynamic';
import Link from 'next/link';
import Navigation from './Nav';
const MobileMenu = dynamic(() => import('./MobileMenu'), {
    ssr: false,
});

export default function Header() {
    return (
        <header>
            <div className="px-8 py-2 flex items-end bg-black text-white">
                <div className="ml-auto flex items-center space-x-4">
                    <nav className="hidden md:flex space-x-8">
                        <Link href="#" className="hover:text-blue-600 md:text-xs">
                            [ LinkedIn ]
                        </Link>
                        <Link href="#" className="hover:text-blue-600 md:text-xs">
                            [ Github ]
                        </Link>
                    </nav>
                    <div className="md:hidden">
                        <MobileMenu />
                    </div>
                </div>
            </div>
            <div className="hidden md:block">
                <Navigation />
            </div>
        </header>
    );
}
