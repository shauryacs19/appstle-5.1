import { ShareLinks } from "@/components/features/articles/ShareLinks";
import { VideoEmbed } from "@/components/features/articles/VideoEmbed";
import { ArticleBody } from "@/components/sections/article/ArticleBody";
import { ArticleCta } from "@/components/sections/article/ArticleCta";
import { ArticleHero } from "@/components/sections/article/ArticleHero";
import { AuthorBox } from "@/components/sections/article/AuthorBox";
import { AuthorLine } from "@/components/sections/article/AuthorLine";
import { Chip } from "@/components/sections/article/Chip";
import { EntryCover } from "@/components/sections/article/EntryCover";
import { HeroCover } from "@/components/sections/article/HeroCover";
import { EntryMeta } from "@/components/sections/article/EntryMeta";
import { PdfAttachment } from "@/components/sections/article/PdfAttachment";
import { ProductAsideCard } from "@/components/sections/article/ProductAsideCard";
import { RelatedEntries } from "@/components/sections/article/RelatedEntries";
import { JsonLd } from "@/components/seo/JsonLd";
import { authorFor } from "@/data/articles/authors";
import { blogCopy, categoryName, primaryCategory, productOfPost } from "@/data/articles/blog";
import { relatedPosts } from "@/data/content/blog";
import { accentFor, categoryProduct } from "@/data/content/accents";
import { formatDate, readingMinutes } from "@/data/content/format";
import type { BlogPost } from "@/data/content/types";
import { productById } from "@/data/products";
import { prepareContent } from "@/lib/html";
import { absoluteUrl, articleLd } from "@/lib/jsonld";
import { entryRoutes, routes } from "@/lib/routes";
import { fitDescription } from "@/lib/seo";
import { postCard } from "./postCard";

export function BlogPostPage({ post }: { post: BlogPost }) {
  const { html, toc } = prepareContent(post.html);
  const cat = primaryCategory(post);
  const productId = productOfPost(post);
  const product = productId ? productById[productId] : undefined;
  const accent = accentFor(productId);
  const videos = post.embeds.filter((e) => /youtube\.com\/embed\//.test(e));
  const pdfs = post.embeds.flatMap((e) => {
    const file = e.match(/[?&]file=([^&#]+\.pdf)/i)?.[1];
    return file ? [decodeURIComponent(file)] : [];
  });
  const crumbs = [
    { name: "Home", path: routes.home },
    { name: "Blog", path: routes.blog },
    ...(cat ? [{ name: categoryName(cat), path: entryRoutes.blogCategory(cat) }] : []),
    { name: post.title, path: post.path },
  ];

  return (
    <>
      <JsonLd
        data={articleLd({
          type: "BlogPosting",
          headline: post.title,
          description: fitDescription(post.seo.description, post.excerpt),
          path: post.path,
          datePublished: post.date.slice(0, 10),
          dateModified: post.modified.slice(0, 10),
          author: post.author,
          section: categoryName(cat),
        })}
      />
      <ArticleHero
        crumbs={crumbs}
        chips={post.categories.map((c) => (
          <Chip key={c} href={entryRoutes.blogCategory(c)} accent={accentFor(categoryProduct[c])}>
            {categoryName(c)}
          </Chip>
        ))}
        title={post.title}
        meta={
          <div className="flex flex-col gap-3">
            <AuthorLine name={post.author || "Team Appstle"} />
            <EntryMeta
              items={[
                <time key="d" dateTime={post.date.slice(0, 10)}>
                  {formatDate(post.date)}
                </time>,
                `Est. reading time: ${readingMinutes(post.words)} minutes`,
              ]}
              className="text-[0.88rem]"
            />
          </div>
        }
        aside={
          <HeroCover>
            <EntryCover image={post.image} accent={accent} product={productId} label={blogCopy.eyebrow} kicker={categoryName(cat)} size="hero" sizes="(min-width: 1024px) 40vw, 100vw" priority />
          </HeroCover>
        }
      />
      <ArticleBody
        html={html}
        toc={toc}
        aside={
          <>
            <ShareLinks url={absoluteUrl(post.path)} title={post.title} label={blogCopy.shareLabel} />
            {product && <ProductAsideCard product={product} />}
          </>
        }
        after={
          <div className="grid gap-8">
            {videos.map((v) => (
              <VideoEmbed key={v} src={v} title={`Video: ${post.title}`} />
            ))}
            {pdfs.map((f) => (
              <PdfAttachment key={f} url={f} />
            ))}
            <AuthorBox author={authorFor(post.author)} title={blogCopy.aboutAuthor} />
          </div>
        }
      />
      <RelatedEntries
        id="related-posts"
        eyebrow={categoryName(cat)}
        title={blogCopy.relatedTitle}
        cards={relatedPosts(post).map(postCard)}
        more={cat ? { href: entryRoutes.blogCategory(cat), label: `More in ${categoryName(cat)}` } : undefined}
      />
      <ArticleCta product={product} />
    </>
  );
}
