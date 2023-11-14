import Breaker from "../components/shared/breaker"
import Header from '../components/shared/rubrik'
import Data from '../data/data.json'
import Link from "next/link"
import { getAllPosts } from '@/lib/api'

export default async function About() {
    const posts = await getAllPosts()
    const pageData = Data.aboutUs

    return (
        <>
            <Header heading={pageData.heading} />
            <section className="w-11/12 md:w-3/6 ">
                <h2 className="md:text-4xl pb-8">{pageData.subheading}</h2>
                {pageData.text.map((text, index) => (
                    <p key={index} className="text-base">
                        {text}
                    </p>
                ))}
            </section>
            <section className="w-11/12 md:w-3/6 ">
                <p className="text-lg">Vill du veta mer om våra kundskaper kolla in våran <a href="https://www.linkedin.com/in/patriklindstrom64/" className="link">linkedin profil</a>
                </p>
            </section>
            <Breaker />
            <section className="w-11/12 md:w-3/6 my-10">
                <h2 className="md:text-4xl pb-8"> Senaste bloggar</h2>
            </section>
            <section className="w-11/12 mb-10">
                <div className="flex flex-row justify-around items-center">
                    {posts.slice(0, 2).map((post,index) => {
                        return (
                            <div key={index} className="px-8">
                                <h2 className="pb-2 md:text-2xl">{post.title}</h2>
                                <p className="pb-6 text-xs italic">{post.date}</p>
                                <p className="pb-4 text-l ">{post.description}</p>
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
            <Breaker />
            <section className="w-11/12 md:w-3/6">
                <h2 className="md:text-4xl pb-8">Kurser och Seminarier</h2>
            </section>
            {
                pageData.stycken.map((stycke,index) => (
                    <section key={index} className="w-11/12 md:w-3/6  mb-10">
                        <h3 className="text-2xl">{stycke.heading}</h3>
                        <p className="text-base">{stycke.text}</p>
                        <ul className="list-disc p-4">
                            {stycke.list.map((text, index) => (
                                <li key={index} className="text-base pb-2">
                                    {text}
                                </li>
                            ))}
                        </ul>
                    </section>
                ))
            }
        </>

    )
}