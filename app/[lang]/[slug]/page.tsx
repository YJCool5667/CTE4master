import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { listStaticParams, readPage, rewriteLegacyLinks, type Lang, type Slug } from '@/lib/content';

export const dynamicParams = false;

export function generateStaticParams() {
  return listStaticParams().map((p) => ({ lang: p.lang, slug: p.slug! }));
}

export default async function Page({ params }: { params: Promise<{ lang: Lang; slug: Slug }> }) {
  const { lang, slug } = await params;
  const { title, body } = readPage(lang, slug);
  const htmlFixed = rewriteLegacyLinks(body, lang);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">{title}</h1>
      <div className="mt-6 prose prose-slate max-w-none">
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{htmlFixed}</ReactMarkdown>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang; slug: Slug }> }) {
  const { lang, slug } = await params;
  const { title } = readPage(lang, slug);
  return { title };
}
