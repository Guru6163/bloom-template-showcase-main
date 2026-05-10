import { createFileRoute, notFound } from "@tanstack/react-router";
import { Navbar } from "@/components/bloom/Navbar";
import { Footer } from "@/components/bloom/Footer";
import { TemplateDetail } from "@/components/bloom/TemplateDetail";
import { getTemplateBySlug } from "@/data/templates";

export const Route = createFileRoute("/templates/$slug")({
  loader: ({ params }) => {
    const template = getTemplateBySlug(params.slug);
    if (!template) throw notFound();
    return { template };
  },
  head: ({ loaderData }) => {
    const t = loaderData?.template;
    if (!t) return { meta: [{ title: "Template not found — Bloom" }] };
    return {
      meta: [
        { title: `${t.title} — Build with Bloom` },
        { name: "description", content: t.description },
        { property: "og:title", content: `${t.title} — Build with Bloom` },
        { property: "og:description", content: t.description },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: TemplatePage,
  notFoundComponent: NotFound,
  errorComponent: ErrorView,
});

function TemplatePage() {
  const { template } = Route.useLoaderData();
  return (
    <div className="min-h-screen bg-bloom-bg text-bloom-text">
      <Navbar />
      <main>
        <TemplateDetail template={template} />
      </main>
      <Footer />
    </div>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen bg-bloom-bg text-bloom-text flex items-center justify-center px-8">
      <div className="text-center">
        <div className="text-bloom-orange text-xs uppercase mb-3" style={{ letterSpacing: "0.1em" }}>404</div>
        <h1 className="text-bloom-text font-medium text-2xl mb-3">Template not found</h1>
        <a href="/" className="text-bloom-orange hover:underline text-sm">← All templates</a>
      </div>
    </div>
  );
}

function ErrorView({ error }: { error: Error }) {
  return (
    <div className="min-h-screen bg-bloom-bg text-bloom-text flex items-center justify-center px-8">
      <div className="text-center max-w-md">
        <h1 className="text-bloom-text font-medium text-xl mb-3">Something went wrong</h1>
        <p className="text-bloom-muted text-sm mb-6">{error.message}</p>
        <a href="/" className="text-bloom-orange hover:underline text-sm">← All templates</a>
      </div>
    </div>
  );
}
