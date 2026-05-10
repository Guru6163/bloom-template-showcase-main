import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/bloom/Navbar";
import { Hero } from "@/components/bloom/Hero";
import { TemplateGrid } from "@/components/bloom/TemplateGrid";
import { BottomCTA } from "@/components/bloom/BottomCTA";
import { Footer } from "@/components/bloom/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Build with Bloom — Developer Templates" },
      {
        name: "description",
        content:
          "Real working integrations built on Bloom's API and MCP. Slack agents, Figma plugins, Canva apps, n8n workflows, Shopify automations and more — clone and deploy in minutes.",
      },
      { property: "og:title", content: "Build with Bloom — Developer Templates" },
      {
        property: "og:description",
        content:
          "8 production-ready templates built on Bloom's API and MCP. Clone and deploy in minutes.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-bloom-bg text-bloom-text">
      <Navbar />
      <main>
        <Hero />
        <TemplateGrid />
        <BottomCTA />
      </main>
      <Footer />
    </div>
  );
}
