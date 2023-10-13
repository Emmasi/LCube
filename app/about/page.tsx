import Breaker from "../components/shared/breaker"
import Header from '../components/shared/rubrik'
import Data from '../data/data.json'
import Komments from '../components/shared/treBox'

export default function About() {
    const pageData = Data.aboutUs

    return (
        <>
            <Header heading={pageData.heading} />
            <section className="w-11/12 md:w-3/6 ">
                <h2 className="md:text-4xl pb-8">{pageData.subheading}</h2>
                {pageData.text.map((text, index) => (
                    <p key={index} className="text-base pb-6">
                        {text}
                    </p>
                ))}
            </section>
            <section className="w-11/12 md:w-3/6 ">
                <p className="text-lg pb-6 pt-8">Vill du veta mer om våra kundskaper kolla in våran <a href="#" className="link">linkedin profil ></a>
                </p>
            </section>
            <Breaker />
            <section className="w-11/12 md:w-3/6  mb-10">
                <h2 className="md:text-4xl pb-8"> Senaste bloggar</h2>
                <Komments class={pageData.lastBlog} />
            </section>
            <Breaker />
            {pageData.stycken.map((stycke) => (
                <section className="w-11/12 md:w-3/6  mb-10">
                    <h3 className="text-2xl">{stycke.heading}</h3>
                    <p className="text-base pt-3">{stycke.text}</p>
                    <ul className="list-disc p-4">
                        {stycke.list.map((text, index) => (
                            <li key={index} className="text-base pb-2">
                                {text}
                            </li>
                        ))}
                    </ul>
                </section>
            ))}
        </>

    )
}