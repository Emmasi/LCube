import { getPostById, getAllPosts } from '@/lib/api'

export default async function Post({
    params: { id },
  }: {
    params: { id: string }
  }) {
    const { html, title, date, description } = await getPostById(id)
    return (
      <article>
        <h1>{title}</h1>
        <p>{date}</p>
        <p>{description}</p>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    )
  }
  
  // This function can statically allow nextjs to find all the posts that you
  // have made, and statically generate them
  export async function generateStaticParams() {
    const posts = await getAllPosts()
  
    return posts.map(post => ({
      id: post.id,
    }))
  }
  
  // Set the title of the page to be the post title, note that we no longer use
  // e.g. next/head in app dir, and this can be async just like the server
  // component
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