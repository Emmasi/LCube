import Link from "next/link"
import Image from 'next/image'
import PostPreview from "../_posts/test.mdx"


export type PostPreview = {
    title: string,
    date: string
    description: string
    id: string
}
export default function Blogcard({ postPreview, isWhiteText }: { postPreview: PostPreview, isWhiteText: boolean }) {
    const textColorClass = isWhiteText ? 'text-white' : 'text-black';

    return (
        <div className='md:flex p-6 max-w-screen-xl'>
            <div className='flex flex-col justify-between md:mr-20 md:mb-0 mb-20'>
                <h2 className={`pb-2 md:text-4xl ${textColorClass}`}>{postPreview.title}</h2>
                <p className={`text-xs italic ${textColorClass}`}>{postPreview.date}</p>
                <p className={`text-lg ${textColorClass}`}>{postPreview.description}</p>
                <Link href={`/posts/${postPreview.id}`}>
                    <button className="readMoreBtn py-2 px-5">Read more</button>
                </Link>
            </div>
            <img src='/dataimg.jpg' alt="vi får se" className='md:max-w-lg' />

        </div>
    )
}
