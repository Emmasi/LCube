
import Link from 'next/link'
import BlogCard from '../components/shared/blog'
import Heading from '../components/shared/rubrik'
import Breaker from '../components/shared/breaker'
import { getAllPosts } from '@/lib/api'

export default async function Page() {
    const posts = await getAllPosts()

    return (
        <>
            <Heading heading="Blog" />
            <section className="w-11/12 md:w-3/6 ">
            <ul className="">
                {posts.map(post => {
                    const { id, date, title, description } = post
                    return (
                            <li key={id} className="p-6">
                                <BlogCard postPreview={post} />
                                <Breaker />
                            </li>   
                    )
                })}
            </ul>
            </section>
        </>
    )
}
