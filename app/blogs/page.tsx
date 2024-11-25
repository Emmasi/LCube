import BlogCard from '../components/shared/blog'
import { getAllPosts } from '@/lib/api'

export default async function Page() {
    const posts = await getAllPosts()

    return (
            <section>
            <ul>
                {posts.map((post, index) => {
                    const { id, date, title, description } = post
                    const backgroundClass = index % 2 === 0 ? 'bg-black' : 'bg-white';
                    return (
                            <li key={id} className={`py-10 flex flex-col justify-center items-center ${backgroundClass}`}>
                                <BlogCard postPreview={post} isWhiteText={index % 2 === 0}/>
                            </li>   
                    )
                })}
            </ul>
            </section>
    )
}
