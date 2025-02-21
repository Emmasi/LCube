import Image from 'next/image'
import Hero from '../components/shared/hero'
import Data from '../data/data.json'
import Breadcrum from '../components/global/Breadcrum'

export default function Contact() {
    const pageData = Data.contakt

    return (
        <>
            <Breadcrum section="Contakt" />
            <section className="max-w-screen-xl mx-auto px-4 py-20 mb-20">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="md:mr-20 mb-10 md:mb-0">
                        <h1 className="text-xl md:text-6xl font-bold">Kontakta Oss</h1>
                        <div className="mt-6 md:w-96">
                            <p className="text-lg">{pageData.subheading}</p>
                            {pageData.text.map((text, i) => (
                                <p key={i} className="text-sm mt-3">
                                    {text}
                                </p>
                            ))}
                            <div className="mt-6">
                                <Image
                                    src="/emailAddress.png"
                                    alt="email: patrik.lindstrom@lcube.se, email: jane.lindstrom@lcube.se"
                                    width={300}
                                    height={200}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="md:max-w-lg w-full">
                        <div className="w-full flex justify-center">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2152.2757510241363!2d18.080786691349196!3d59.33466386226651!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f9d5a9e56184f%3A0x50075b4d45ba7bb4!2sSkeppargatan%2027%2C%20114%2052%20Stockholm!5e1!3m2!1ssv!2sse!4v1740143814389!5m2!1ssv!2sse"
                                width="600"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );

}