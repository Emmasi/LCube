import { getPostById, getAllPosts } from '@/lib/api'

export default async function Post({
  params: { id },
}: {
  params: { id: string }
}) {
  const { html, title, date } = await getPostById(id)
  return (
    <section className="max-w-4xl mx-auto mt-12 mb-12 px-4">
      <h1 className="mb-6 text-3xl md:text-5xl font-semibold">{title}</h1>
      <p className="mb-4 text-sm italic text-gray-600">{date}</p>
      <div className="prose prose-lg max-w-none">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </section>
  );
  
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