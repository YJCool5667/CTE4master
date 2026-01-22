import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { readPage, rewriteLegacyLinks, type Lang } from '@/lib/content';

export default async function Home({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const { title, body } = readPage(lang, 'index');
  const htmlFixed = rewriteLegacyLinks(body, lang);

  return (
    <article className="prose prose-slate max-w-none">
      {/* title is in content itself; keep metadata only */}
      <ReactMarkdown rehypePlugins={[rehypeRaw]}>
        {htmlFixed}
      </ReactMarkdown>
    </article>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const { title } = readPage(lang, 'index');
  return { title };
}
