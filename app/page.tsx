import Komments from './components/shared/treBox'
import Header from './components/shared/rubrik'
import Data from './data/data.json'

export default function Home() {
    const pageData = Data.start

    return (
        <>
            <Header heading={pageData.heading}/>
            <section className="w-11/12 md:w-3/6 ">
                <p className="text-lg pb-6 pt-8">{pageData.intro}</p>
                {pageData.text.map((text, index) => (
                    <p key={index} className="text-base pb-6">
                        {text}
                    </p>
                ))}
            </section>
            <section className="mt-36">
                <Komments text={pageData.lastBlog} class={"lastBlog"}/>
            </section>
            <section className="mt-36">
                <Komments text={pageData.comment} class={"comments"}/>
            </section> 
        </>

    )
}