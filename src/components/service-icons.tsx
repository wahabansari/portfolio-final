import { CodeIcon, LayoutIcon, RefreshIcon, SparklesIcon } from "./ui";

/**
 * Service slug → icon mapping. The single canonical map: anything routing to
 * the same service topic (the homepage cards, the services hub) reuses this
 * rather than maintaining a second, driftable one.
 */
export const SERVICE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "custom-web-development": CodeIcon,
  "business-dashboards": LayoutIcon,
  "software-modernization": RefreshIcon,
  "ai-business-automation": SparklesIcon,
};
