import React, { ReactNode } from 'react';
import Navigation from './nav'


export default function Header() {
    return (
        <header className='md:px-24 max-w-screen-2xl mb-10 px-8 header'>
            <div className='header__content'>
                <Navigation />
            </div>
        </header>
    )
}