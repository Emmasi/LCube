import Image from 'next/image'
import Hero from '../components/shared/hero'
import Data from '../data/data.json'

export default function Contact() {
    const pageData = Data.contakt

    return (
        <section className='hero flex flex-col md:flex-row justify-center items-center py-20 mb-20'>
            <div className='mr-0 md:mr-20 mb-10 md:mb-0'>
                <h1 className='text-2xl md:mt-0 md:text-6xl font-semibold'>Kontakta Oss</h1>
                <div className='md:w-96'>
                    <p className="text-lg">{pageData.subheading}</p>
                    {pageData.text.map((text, i) => (
                        <p key={i} className="text-base pt-3">{text}</p>
                    ))}
                    <Image src='/emailAddress.png' alt="email:patrik.lindstrom@lcube.se email: jane.lindstrom@lcube.se" width={300} height={200} />
                </div>
            </div>
            <img src='/dataimg.jpg' alt="vi får se" className='md:max-w-lg' />

        </section>
    )
}