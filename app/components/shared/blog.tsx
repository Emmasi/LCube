import Link from "next/link"
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
                <Link
                    href={`/posts/${postPreview.id}`}
                    className="inline-flex items-center mt-4 py-1 px-2 bg-blue-600 text-white rounded hover:bg-blue-700 max-w-fit"
                >
                    <span>Read more</span>
                    <svg
                        className="ml-2 w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                </Link>

            </div>
            <img src='/dataimg.jpg' alt="vi får se" className='md:max-w-lg' />

        </div>
    )
}
