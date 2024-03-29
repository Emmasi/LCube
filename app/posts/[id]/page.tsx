import { getPostById, getAllPosts } from '@/lib/api'

export default async function Post({
  params: { id },
}: {
  params: { id: string }
}) {
  const { html, title, date } = await getPostById(id)
  return (
    <section className="max-w-screen-2xl mb-10 px-8">
      <h1 className="my-10 text-2xl md:mt-0 md:text-6xl font-semibold">{title}</h1>
      <p className="text-s italic">{date}</p>
      <div className="py-6" dangerouslySetInnerHTML={{ __html: html }} />
    </section>
  )
}

export async function generateStaticParams() {
  const posts = await getAllPosts()

  return posts.map(post => ({
    id: post.id,
  }))
}

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string }
}) {
  const { title } = await getPostById(id)
  return {
    title,
  }
}