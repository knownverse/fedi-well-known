import { fetchJSON, WellKnowResult } from "./common";

const mastdonUrl = "api/v1/instance/domain_blocks"
const mastodonMinVer = "4.0.0"


export async function fetchBlocklistFromMastodon(domain: string): Promise<WellKnowResult> {
    return fetchJSON(`https://${domain}/${mastdonUrl}`);
}

export async function fetchBlocklist(domain: string): Promise<WellKnowResult> {
    return fetchBlocklistFromMastodon(domain);
}