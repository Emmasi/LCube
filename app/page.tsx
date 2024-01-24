import Komments from './components/shared/comments'
import Breaker from "./components/shared/breaker"
import Header from './components/shared/rubrik'
import Data from './data/data.json'
import Link from "next/link"
import { getAllPosts } from '@/lib/api'

export default async function Home() {
    const posts = await getAllPosts()
    const pageData = Data.start
    const aboutData = Data.aboutUs

    return (
        <>
            <Header heading={pageData.heading} />
            <section className='max-w-screen-2xl mb-10'>
                <p className='text-lg px-8'>{pageData.intro}</p>
                {pageData.text.map((text, index) => (
                    <p key={index} className='text-base px-8 pb-6'>
                        {text}
                    </p>
                ))}
            </section>
            <section className='max-w-screen-2xl mb-10'>
                <h2 className='md:text-4xl px-8 pb-8'>{aboutData.subheading}</h2>
                {aboutData.text.map((text, index) => (
                    <p key={index} className=' px-8 text-base'>
                        {text}
                    </p>
                ))}
            </section>
            <section className='max-w-screen-2xl mb-10'>
                <p className='text-lg'>Vill du veta mer om våra kundskaper kolla in våran <a href="https://www.linkedin.com/in/patriklindstrom64/" className='link'>linkedin profil</a>
                </p>
            </section>
            <section className='max-w-screen-2xl mb-10'>
                <h2 className='md:text-4xl px-8 pb-8'>Kompetenser</h2>
                <div className='px-8 flex flex-col justify-center md:flex-row md:justify-between'>
                {
                    aboutData.stycken.map((stycke, index) => (
                        <span key={index} className='w-full md:w-4/12'>
                            <h3 className='text-2xl'>{stycke.heading}</h3>
                            <p className='text-base'>{stycke.text}</p>
                            <ul className='list-disc p-4'>
                                {stycke.list.map((text, index) => (
                                    <li key={index} className='text-base pb-2'>
                                        {text}
                                    </li>
                                ))}
                            </ul>
                        </span>
                    ))
                }
                </div>
            </section>
            <Breaker />

            <section className='mb-10'>
                <h2 className='md:text-4xl pb-8'>Senaste bloggar</h2>
            </section>
            <section className='max-w-screen-xl mb-10'>
                <div className='px-8 flex flex-col justify-center md:flex-row md:justify-between items-center allpost'>
                    {posts.slice(0, 2).map((post: any, index: number) => {
                        return (
                            <div key={index} className='flex flex-col justify-between w-full md:w-2/5'>
                                <img src={post.img} alt={post.alt} className='md:max-w-lg'/>
                                <h2 className='pb-2 md:text-2xl'>{post.title}</h2>
                                <p className='text-xs italic'>{post.date}</p>
                                <p className='text-l '>{post.description}</p>
                                <Link href={`/posts/${post.id}`}>
                                    <div className='self-end'>
                                        <p className='text-lg'>Läs mer..</p>
                                    </div>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </section >
            <Breaker />
            <section className='my-10'>
                <h2 className='md:text-4xl pb-8'>Kommentarer</h2>
            </section>
            <section className='max-w-screen-2xl'>
                <Komments comments={pageData.comment} class={"comments"} />
            </section>
        </>

    )
}