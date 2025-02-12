import { getAllPosts } from '@/lib/api'
import Link from "next/link"

export default async function dubbleBloggCards() {
  const posts = await getAllPosts()

  return (
    <>
      <section className="mb-1 md:mb-10">
        <h2 className="pb-6 md:text-4xl font-bold text-center">Senaste bloggar</h2>
      </section>
      <section className="max-w-screen-xl mx-auto mb-20">
        <div className="flex flex-col justify-center items-center md:flex-row md:justify-between">
          {posts.slice(0, 2).map((post: any, index: number) => (
            <div
              key={index}
              className="flex flex-col justify-between w-full md:w-2/5 p-10 md:p-0"
            >
              <h3 className="pb-2 md:text-2xl font-semibold">{post.title}</h3>
              <p className="text-xs italic">{post.date}</p>
              <p className="text-lg mt-4">{post.description}</p>
              <Link href={`/posts/${post.id}`} className="hover:text-blue-600 hover:underline md:text-sm py-2">
              [ Read more ]
              </Link>
              {/* <Link
                href={`/posts/${post.id}`}
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
              </Link> */}
            </div>
          ))}
        </div>
      </section>
    </>
  );

}