import Breadcrum from '@/app/components/global/Breadcrum';
import MarkdownRenderer from '@/app/components/global/MarkdownRenderer';
import { getPostById, getAllPosts } from '@/lib/api';

export default async function Post({ params: { id } }: { params: { id: string } }) {
  const { content, title, date } = await getPostById(id); // Nu får vi `content` korrekt!

  return (
    <>
      <Breadcrum section="Blogs" page={title.split(" ").slice(0, 4).join(" ") + "..."} />
      <section className="max-w-4xl mx-auto mt-12 mb-12 px-4">
        <h1 className="mb-6 text-xl md:text-5xl font-semibold">{title}</h1>
        <p className="mb-4 text-sm italic text-gray-600">{date}</p>
        <div className="prose prose-lg max-w-none">
          <MarkdownRenderer content={content} />
        </div>
      </section>
    </>
  );
}

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map(post => ({
    id: post.id,
  }));
}

export async function generateMetadata({ params: { id } }: { params: { id: string } }) {
  const { title } = await getPostById(id);
  return {
    title,
  };
}
