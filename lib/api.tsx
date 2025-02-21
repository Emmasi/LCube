import fs from "fs";
import matter from "gray-matter";
import { join } from "path";
import { unified } from "unified";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypePrism from "rehype-prism-plus";

const postsDirectory = join(process.cwd(), "_posts");

export async function getPostById(id: string) {
  const realId = id.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realId}.md`);

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Markdown-fil saknas för id: ${id}`);
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypePrism) 
    // Aktiverar syntax highlighting
    .use(rehypeStringify)
    .process(content);

  return {
    id: realId,
    title: data.title || "No title",
    description: data.description || "",
    img:data.img || "",
    alt:data.alt || "Bild text saknas",
    date: data.date ? new Date(data.date).toISOString().slice(0, 10) : "Unknown",
    content: processedContent.toString(),
  };
}

export async function getAllPosts() {
  const filenames = fs.readdirSync(postsDirectory).filter((file) => file.endsWith(".md"));

  const posts = await Promise.all(filenames.map((id) => getPostById(id)));

  return posts.sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
}
