import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export type PostMeta = {
  title: string;
  description: string;
  date: string;
  updatedAt: string;
  author: string;
  category: string;
  slug: string;
  tags?: string[];
};

export function getPostBySlug(slugInput: string | string[]) {
  if (!slugInput) return null;
  const realSlug = Array.isArray(slugInput) ? slugInput.join('/') : slugInput;
  const fullPath = path.join(contentDirectory, `${realSlug}.mdx`);
  
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      meta: { ...data, slug: realSlug } as PostMeta,
      content,
    };
  } catch {
    return null;
  }
}

export function getAllPostsMeta(): PostMeta[] {
  // Simple recursive directory read
  const walkSync = (dir: string, filelist: string[] = []) => {
    if (!fs.existsSync(dir)) return filelist;
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
      const filepath = path.join(dir, file);
      if (fs.statSync(filepath).isDirectory()) {
        filelist = walkSync(filepath, filelist);
      } else {
        if (file.endsWith('.mdx')) {
          filelist.push(filepath);
        }
      }
    });
    return filelist;
  };

  const mdxFiles = walkSync(contentDirectory);

  const posts = mdxFiles.map((filepath) => {
    const fileContents = fs.readFileSync(filepath, 'utf8');
    const { data } = matter(fileContents);
    // Determine slug from filepath
    const relativePath = path.relative(contentDirectory, filepath);
    const slug = relativePath.replace(/\.mdx$/, '').replace(/\\/g, '/');
    return { ...data, slug } as PostMeta;
  });

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getCategories() {
  const posts = getAllPostsMeta();
  const categories = new Set(posts.map(post => post.category));
  return Array.from(categories).filter(Boolean);
}

export function slugifyCategory(category: string) {
  return category
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getCategoryBySlug(slug: string) {
  return getCategories().find((category) => slugifyCategory(category) === slug);
}

export function getPostsByCategory(category: string) {
  return getAllPostsMeta().filter((post) => post.category.toLowerCase() === category.toLowerCase());
}
