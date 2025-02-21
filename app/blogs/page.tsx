import BlogCard from '../components/shared/blog'
import { getAllPosts } from '@/lib/api'
import Breadcrum from '../components/global/Breadcrum'

export default async function Page() {
    const posts = await getAllPosts()

    return (
        <section>
            <Breadcrum section="Blogs" />
            <ul className="w-full flex flex-col items-center">
                {posts.map((post, index) => {
                    const backgroundClass = index % 2 === 0 ? "bg-black" : "bg-white";
                    return (
                        <li key={post.id} className={`py-10 flex justify-center w-full ${backgroundClass}`}>
                            <BlogCard postPreview={post} isWhiteText={index % 2 === 0} />
                        </li>
                    );
                })}
            </ul>
        </section>
    )
}
