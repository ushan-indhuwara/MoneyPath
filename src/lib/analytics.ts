export type ProductEvent =
  | 'scenario_saved'
  | 'scenario_loaded'
  | 'scenario_exported'
  | 'guide_tool_click';

declare global {
  interface Window {
    gtag?: (command: string, eventName: string, parameters?: Record<string, string>) => void;
  }
}

export function trackProductEvent(
  eventName: ProductEvent,
  parameters: Record<string, string> = {}
) {
  if (typeof window === 'undefined') return;
  try {
    if (window.localStorage.getItem('moneypath_analytics_consent') !== 'accepted') return;
  } catch {
    return;
  }
  // Only pass event names and non-financial context. Never send calculator inputs or results.
  window.gtag?.('event', eventName, parameters);
}

export function openPrivacyChoices() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('moneypath:open-privacy-choices'));
  }
}
