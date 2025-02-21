import { getAllPosts } from '@/lib/api'
import Link from "next/link"

export default async function dubbleBloggCards() {
  const posts = await getAllPosts()

  return (
    <>
      <section className="mb-1 md:mb-10">
        <h2 className="pb-6 md:text-2xl font-bold text-center">Senaste bloggar</h2>
      </section>
      <section className="max-w-screen-xl mx-auto mb-20">
        <div className="flex flex-col justify-center items-center md:flex-row md:justify-between">
          {posts.slice(0, 2).map((post: any, index: number) => (
            <div
              key={index}
              className="flex flex-col justify-between w-full md:w-2/5 p-10 md:p-0"
            >
              <h3 className="pb-2 md:text-base font-semibold">{post.title}</h3>
              <p className="text-xs italic">{post.date}</p>
              <p className="text-sm mt-4">{post.description}</p>
              <Link href={`/posts/${post.id}`} className="hover:text-[#4d7a3d] hover:underline md:text-sm py-2">
              [ Read more ]
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );

}