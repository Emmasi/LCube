import Link from "next/link"
import Image from "next/image"
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
                <h2 className={`pb-2 md:text-2xl ${textColorClass}`}>{postPreview.title}</h2>
                <p className={`text-xs italic ${textColorClass}`}>{postPreview.date}</p>
                <p className={`text-sm ${textColorClass}`}>{postPreview.description}</p>
                <Link href={`/posts/${postPreview.id}`} className={`px-2 py-4 md:text-base text-4xl text-4xl hover:text-blue-600 hover:underline ${textColorClass}`}>
                [ Read more ]
                </Link>
            </div>
            <img src='/dataimg.jpg' alt="vi får se" className='md:max-w-lg' />
        </div>
    )
}
