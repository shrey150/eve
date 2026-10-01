/** Web fetch providers available through Vercel AI Gateway. */
export type WebFetchProvider = "browserbase";

export interface WebFetchProviderInput {
  readonly provider: WebFetchProvider;
}

/** Provider-managed fetch configuration for `agent/tools/web_fetch.ts`. */
export interface WebFetchProviderDefinition {
  readonly kind: "eve:web-fetch-provider";
  readonly provider: WebFetchProvider;
}

/**
 * Replaces local web fetch with a provider-managed tool for AI Gateway models.
 * Fetches page content as Markdown. Requires AI Gateway authentication;
 * direct provider models omit this tool.
 *
 * @example
 * ```ts
 * // agent/tools/web_fetch.ts
 * import { webFetchProvider } from "eve/tools/web_fetch";
 * export default webFetchProvider({ provider: "browserbase" });
 * ```
 */
export function webFetchProvider(input: WebFetchProviderInput): WebFetchProviderDefinition {
  return { kind: "eve:web-fetch-provider", provider: input.provider };
}

export function isWebFetchProviderDefinition(value: unknown): value is WebFetchProviderDefinition {
  return (
    typeof value === "object" &&
    value !== null &&
    "kind" in value &&
    value.kind === "eve:web-fetch-provider"
  );
}
