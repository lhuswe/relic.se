import { Github, Linkedin, Mail } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";

interface FooterLink {
  label: string;
  href: string;
  icon: LucideIcon;
  external?: boolean;
}

const footerLinks: FooterLink[] = [
  { label: "GitHub", href: siteConfig.links.github, icon: Github, external: true },
  { label: "LinkedIn", href: siteConfig.links.linkedin, icon: Linkedin, external: true },
  { label: "Contact", href: `mailto:${siteConfig.author.email}`, icon: Mail },
];

export function SiteFooter() {
  // Evaluated at build time - every deploy refreshes the year.
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col-reverse items-center justify-between gap-6 py-10 sm:flex-row">
        <p className="font-mono text-xs tracking-tight text-muted">
          © {year} {siteConfig.name}
        </p>

        <nav aria-label="Footer" className="flex items-center gap-5">
          {footerLinks.map(({ label, href, icon: Icon, external }) => (
            <a
              key={label}
              href={href}
              {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
              className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
            >
              <Icon aria-hidden="true" className="size-4" />
              {label}
            </a>
          ))}
        </nav>
      </Container>
    </footer>
  );
}
