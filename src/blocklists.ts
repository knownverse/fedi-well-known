import { fetchJSON, WellKnowResult } from "./common";

const mastdonUrl = "api/v1/instance/domain_blocks"
const mastodonMinVer = "4.0.0"


export async function fetchBlockListFromMastodon(domain: string): Promise<WellKnowResult> {
    return fetchJSON(`https://${domain}/${mastdonUrl}`);
}

export async function fetchBlockList(domain: string): Promise<WellKnowResult> {
    return fetchBlockListFromMastodon(domain);
}