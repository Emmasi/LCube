

import BlogCard from '../components/shared/blog'
import Heading from '../components/shared/rubrik'
import Breaker from '../components/shared/breaker'
import { getAllPosts } from '@/lib/api'

export default async function Page() {
    const posts = await getAllPosts()

    return (
        <>
            <Heading heading='Blogg' />
            <section className='max-w-screen-xl mb-10'>
            <ul>
                {posts.map(post => {
                    const { id, date, title, description } = post
                    return (
                            <li key={id} className='mb-20'>
                                <BlogCard postPreview={post} />
                            </li>   
                    )
                })}
            </ul>
            </section>
        </>
    )
}
