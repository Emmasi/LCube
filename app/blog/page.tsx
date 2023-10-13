import Heading from "../components/shared/rubrik"
import Data from '../data/data.json'

export default function Blog() {
    const pageData = Data.blog

    return (
        <>
            <Heading heading={pageData.heading} />

            <section className="w-11/12 md:w-3/6">
                <h2 className="pb-2 md:text-4xl">{pageData.subheading}</h2>
                <p>{pageData.text}</p>
            </section >
        </>
    )
}