import Image from 'next/image'
import Hero from '../components/shared/hero'
import Data from '../data/data.json'

export default function Contact() {
    const pageData = Data.contakt

    return (
        <section className="max-w-screen-xl mx-auto px-4 py-20 mb-20">
            <div className="flex flex-col md:flex-row items-center">
                <div className="md:mr-20 mb-10 md:mb-0">
                    <h1 className="text-3xl md:text-6xl font-bold">Kontakta Oss</h1>
                    <div className="mt-6 md:w-96">
                        <p className="text-lg">{pageData.subheading}</p>
                        {pageData.text.map((text, i) => (
                            <p key={i} className="text-base mt-3">
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
                    <img
                        src="/dataimg.jpg"
                        alt="vi får se"
                        className="rounded-lg shadow-md"
                    />
                </div>
            </div>
        </section>
    );

}