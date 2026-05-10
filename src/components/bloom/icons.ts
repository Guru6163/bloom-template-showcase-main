import type { LucideIcon } from "lucide-react";
import {
  MessageSquare,
  Figma,
  Image as ImageIcon,
  Zap,
  ShoppingBag,
  Workflow,
  Code2,
  Sparkles,
} from "lucide-react";

/**
 * Maps a template's integrationName (or category) to a Lucide icon.
 * Use this everywhere instead of emoji glyphs.
 */
const ICON_MAP: Record<string, LucideIcon> = {
  // Integrations
  Slack: MessageSquare,
  Figma: Figma,
  Canva: ImageIcon,
  Shopify: ShoppingBag,
  n8n: Workflow,
  Automation: Zap,
  Developer: Code2,
  // Fallback / Bloom mark
  Bloom: Sparkles,
};

export function getIntegrationIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? Sparkles;
}
