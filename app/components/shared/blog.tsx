import Link from "next/link"
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
            <h2 className="pb-2 md:text-4xl">{postPreview.title}</h2>
            <p className="text-xs italic">{postPreview.date}</p>
            <p className="text-lg ">{postPreview.description}</p>
            <Link href={`/posts/${postPreview.id}`}>
                <div className="self-end">
                    <p className="text-lg">Läs mer..</p>
                </div>
            </Link>
        </>
    )
}
