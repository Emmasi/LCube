import React, { ReactNode } from 'react';
import Navigation from './nav'


export default function Header() {
    return (
        <header className="md:px-24 header">
            <div className='header__content'>
                <Navigation />
            </div>
        </header>
    )
}