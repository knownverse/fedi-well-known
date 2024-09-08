export class WellKnowResult {
    success: boolean;
    data: any;
    error: string | null;

    constructor(success: boolean, data: any, error: string | null) {
        this.success = success;
        this.data = data;
        this.error = error;
    }

    static Success(data: any): WellKnowResult {
        return new WellKnowResult(true, data, null);
    }

    static Error(error: string): WellKnowResult {
        return new WellKnowResult(false, null, error);
    }
}

export async function fetchJSON(url: string): Promise<WellKnowResult> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            return WellKnowResult.Error(`HTTP error! status: ${url}: ${response.status}`);
        }
        const data = await response.json();
        return WellKnowResult.Success(data);
    } catch (err: any) {
        return WellKnowResult.Error(`Error fetching url ${url}: ${err.cause || err.message}. Stack: \n ${err.stack}`);
    }
}

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