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
        <Link href={`/posts/${postPreview.id}`}>
            <h2 className="pb-2 md:text-4xl">{postPreview.title}</h2>
            <p className="pb-6 text-xs italic">{postPreview.date}</p>
            <p className="pb-4 text-lg ">{postPreview.description}</p>
            {/* <div className="self-end">
                <Button />
            </div> */}
        </Link>
    )
}
