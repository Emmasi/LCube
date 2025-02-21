import Link from "next/link"
import Image from "next/image"
import PostPreview from "../_posts/test.mdx"


export type PostPreview = {
    title: string,
    date: string
    description: string
    img: string
    alt: string
    id: string
}
export default function Blogcard({ postPreview, isWhiteText }: { postPreview: PostPreview, isWhiteText: boolean }) {
    const textColorClass = isWhiteText ? 'text-white' : 'text-black';
    const hasImage = postPreview.img && postPreview.img.trim() !== "";

    return (
      <div className={`grid ${hasImage ? "md:grid-cols-[1fr_250px]" : "md:grid-cols-1"} gap-10 items-stretch p-6 max-w-4xl w-full`}>
        <div className={`flex flex-col ${hasImage ? "justify-between" : "justify-center text-center"}`}>
          <h2 className={`pb-2 md:text-2xl ${textColorClass}`}>{postPreview.title}</h2>
          <p className={`text-xs italic ${textColorClass}`}>{postPreview.date}</p>
          <p className={`text-sm flex-grow ${textColorClass}`}>{postPreview.description}</p>
          <Link
            href={`/posts/${postPreview.id}`}
            className={`px-2 py-4 md:text-base text-lg hover:text-[#4d7a3d] hover:underline ${textColorClass}`}
          >
            [ Read more ]
          </Link>
        </div>
        {hasImage && (
          <div className="flex items-center">
            <img
              src={postPreview.img}
              alt={postPreview.alt}
              className="w-full object-cover rounded-lg shadow-lg"
            />
          </div>
        )}
      </div>
    );
}
