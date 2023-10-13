import Heading from "../components/shared/rubrik"
import Data from '../data/data.json'
import Button from "../components/shared/button"

export default function Blog() {
    const pageData = Data.blogs

    return (
        <>
            <Heading heading={pageData.heading} />

            <section className="w-11/12 md:w-3/6 flex flex-col">
                {pageData.blogs.map((blog, index) => (
                    <div className="mb-6 p-4 flex flex-col blogs">
                        <h2 className="pb-2 md:text-4xl">{blog.subheading}</h2>
                        <p className="pb-6 text-xs italic">xxxx-xx-xx</p>
                        <p className="pb-4 text-lg ">{blog.introText}</p>
                        <div className="self-end">
                            <Button />
                        </div>
                    </div>
                ))}
                <p className="mt-8 text-lg self-end">Se Flera...</p>

            </section >
        </>
    )
}