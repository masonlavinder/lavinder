const postModules = import.meta.glob('../posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export const posts: { filename: string; raw: string }[] = Object.entries(postModules)
  .map(([path, raw]) => ({
    filename: path.split('/').pop() as string,
    raw,
  }));

export const getSlugFromFilename = (filename: string): string => {
  return filename.replace(/^\//, '').replace(/\.md$/, '');
};

export const getFilenameFromSlug = (slug: string): string => {
  return `${slug}.md`;
};
