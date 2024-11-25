import React, { ReactNode } from 'react';
import Navigation from './nav'


export default function Header() {
    return (
        <header>
            <div className='header__top px-8'>
                <ul className='flex justify-end p-2'>
                    <li className='px-8'><a>LindedIn</a></li>
                    <li className='px-8'><a>Github</a></li>
                </ul>
            </div>
            <div className='header__bottom'>
                <Navigation />
            </div>
        </header>
    )
}