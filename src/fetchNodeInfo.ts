import { fetchJSON, WellKnowResult } from "./common";

export {WellKnowResult, fetchJSON}

export async function fetchWellKnown(domain: string, uriSuffix: string): Promise<WellKnowResult> {
    return fetchJSON(`https://${domain}/.well-known/${uriSuffix}`);
}

export async function fetchWellKnownLinks(
    domain: string,
    uriSuffix: string,
    relFilter?: string | null
): Promise<WellKnowResult> {
    const wellKnowResult = await fetchWellKnown(domain, uriSuffix);
    if (!wellKnowResult.success) return wellKnowResult;

    const { links }: any = wellKnowResult.data;
    if (!links) return WellKnowResult.Error('No links in expected well-known response');

    const linksMap = new Map<string, string>();
    links.forEach((link: { rel: string; href: string; }) => {
        if (!relFilter || link.rel === relFilter) {
            linksMap.set(link.rel, link.href);
        }
    });

    return WellKnowResult.Success(linksMap);
}

export async function fetchNodeInfo(domain: string, relFilter: string | null = null): Promise<WellKnowResult> {
    const wellKnowResult = await fetchWellKnownLinks(domain, 'nodeinfo', relFilter);
    if (!wellKnowResult.success) return wellKnowResult;

    const firstUrl = wellKnowResult.data.values().next().value;
    return fetchJSON(firstUrl);
}