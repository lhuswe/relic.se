import {
  BookOpen,
  Bot,
  Boxes,
  Calculator,
  CalendarClock,
  Code2,
  Compass,
  Database,
  FileCode2,
  Gauge,
  Globe,
  Image as ImageIcon,
  Layers,
  LineChart,
  Map,
  Mountain,
  Music,
  Notebook,
  Package,
  Palette,
  Radio,
  Rocket,
  Search,
  Server,
  Shield,
  Sparkles,
  Terminal,
  Timer,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

/**
 * Icon registry.
 *
 * Project data stores an icon *name*, not a component, which keeps
 * `data/projects.ts` serialisable - the same file could be swapped for JSON,
 * MDX front matter or a CMS response without touching any component.
 *
 * Adding an icon: import it from lucide-react and add one line below.
 */
export const projectIcons = {
  bot: Bot,
  boxes: Boxes,
  book: BookOpen,
  calculator: Calculator,
  calendar: CalendarClock,
  chart: LineChart,
  code: Code2,
  compass: Compass,
  database: Database,
  file: FileCode2,
  gauge: Gauge,
  globe: Globe,
  image: ImageIcon,
  layers: Layers,
  map: Map,
  mountain: Mountain,
  music: Music,
  notebook: Notebook,
  package: Package,
  palette: Palette,
  radio: Radio,
  rocket: Rocket,
  search: Search,
  server: Server,
  shield: Shield,
  sparkles: Sparkles,
  terminal: Terminal,
  timer: Timer,
  wrench: Wrench,
  zap: Zap,
} as const satisfies Record<string, LucideIcon>;

export type ProjectIconName = keyof typeof projectIcons;

/** Resolve an icon name from project data to a renderable component. */
export function getProjectIcon(name: ProjectIconName): LucideIcon {
  return projectIcons[name];
}
