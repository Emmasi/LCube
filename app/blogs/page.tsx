

import BlogCard from '../components/shared/blog'
import Heading from '../components/shared/rubrik'
import Breaker from '../components/shared/breaker'
import { getAllPosts } from '@/lib/api'

export default async function Page() {
    const posts = await getAllPosts()

    return (
        <div className='max-w-screen-2xl mb-10 px-12'>
            <Heading heading='Blogg' />
            <section>
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
        </div>
    )
}
