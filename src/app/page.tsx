import { Hero } from "@/components/sections/hero";
import { ProjectsSection } from "@/components/sections/projects-section";
import { getCategories, getProjects, getProjectStats } from "@/lib/projects";
import { siteConfig } from "@/config/site";

export default function HomePage() {
  // Resolved once at build time - the client receives plain data.
  const projects = getProjects();
  const categories = getCategories();
  const stats = getProjectStats();

  return (
    <>
      <Hero stats={stats} />
      <ProjectsSection projects={projects} categories={categories} />

      {/* Structured data: helps search engines label the site correctly. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: siteConfig.name,
            url: siteConfig.url,
            description: siteConfig.description,
            author: {
              "@type": "Person",
              name: siteConfig.author.name,
              url: siteConfig.links.github,
            },
          }),
        }}
      />
    </>
  );
}
