import Komments from './components/shared/comments'
import Header from './components/shared/rubrik'
import Data from './data/data.json'
import Link from "next/link"
import { getAllPosts } from '@/lib/api'

export default async function Home() {
    const posts = await getAllPosts()
    const pageData = Data.start

    return (
        <>
            <Header heading={pageData.heading}/>
            <section className="w-11/12 md:w-3/6 ">
                <p className="text-lg">{pageData.intro}</p>
                {pageData.text.map((text, index) => (
                    <p key={index} className="text-base pb-6">
                        {text}
                    </p>
                ))}
            </section>
            <section className="w-11/12 md:w-3/6 my-10">
                <h2 className="md:text-4xl pb-8"> Senaste bloggar</h2>
            </section>
            <section className="w-11/12 mb-10">
                <div className="flex flex-row justify-around items-center">
                    {posts.slice(0, 2).map(post => {
                        return (
                            <div className="px-8">
                                <h2 className="pb-2 md:text-2xl">{post.title}</h2>
                                <p className="text-xs italic">{post.date}</p>
                                <p className="text-l ">{post.description}</p>
                                <Link href={`/posts/${post.id}`}>
                                    <div className="self-end">
                                        <p className="text-lg">Läs mer..</p>
                                    </div>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </section >
            <section className="mt-36">
                <Komments text={pageData.comment} class={"comments"}/>
            </section> 
        </>

    )
}