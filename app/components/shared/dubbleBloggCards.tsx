import { getAllPosts } from '@/lib/api'
import Link from "next/link"

export default async function dubbleBloggCards() {
  const posts = await getAllPosts()

  return (
    <>
      <section className='mb-1 md:mb-10'>
        <h2 className='md:text-4xl pb-6'>Senaste bloggar</h2>
      </section>
      <section className='max-w-screen-xl mb-20'>
        <div className='flex flex-col justify-center md:flex-row md:justify-between items-center allpost'>
          {posts.slice(0, 2).map((post: any, index: number) => {
            return (
              <div key={index} className='flex flex-col justify-between w-full md:w-2/5 p-10 md:p-0'>
                <h3 className='pb-2 md:text-2xl'>{post.title}</h3>
                <p className='text-xs italic'>{post.date}</p>
                <p className='text-l '>{post.description}</p>
                <Link href={`/posts/${post.id}`}>
                    <button className="readMoreBtn py-2 px-5">Read more</button>
                </Link>
              </div>
            )
          })}
        </div>
      </section >
    </>
  )
}