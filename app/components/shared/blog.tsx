import Link from "next/link"
import Image from 'next/image'
import PostPreview from "../_posts/test.mdx"


export type PostPreview = {
    title: string,
    date: string
    description: string
    id: string
}
export default function Blogcard({ postPreview }: { postPreview: PostPreview }) {

    return (
        <>
            <h2 className='pb-2 md:text-4xl'>{postPreview.title}</h2>
            <p className='text-xs italic'>{postPreview.date}</p>
            <p className='text-lg '>{postPreview.description}</p>
            <Link href={`/posts/${postPreview.id}`}>
                <div className='align-center readMoreBtn'>
                    <p className='text-2xl'>Läs mer</p>
                    <Image src='/icon/arrow_right_icon.svg' alt='Icon' width={40} height={40}/>
                </div>
            </Link>
        </>
    )
}
