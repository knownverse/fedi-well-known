class WellKnowResult {
    constructor(success, data, error) {
        this.success = success;
        this.data = data;
        this.error = error;
    }

    static Success(data) {
        return new WellKnowResult(true, data, null);
    }

    static Error(error) {
        return new WellKnowResult(false, null, error);
    }
}

async function fetchJSON(url){
    try {
        const response = await fetch(url);
        if (!response.ok) {
            return WellKnowResult.Error(`HTTP error! status: ${url}: ${response.status}`);
        }
        const data = await response.json();
        return WellKnowResult.Success(data);
    } catch (err) {
	return WellKnowResult.Error(`Error fetching url ${url}: ${err.cause || err.message}. Stack: \n ${err.stack}`);
    }
}

async function fetchWellKnown(domain, uriSuffix){
    return await fetchJSON(`https://${domain}/.well-known/${uriSuffix}`);
}

async function fetchWellKnownLinks(domain, uriSuffix, relFilter){
    const wellKnowResult = await fetchWellKnown(domain, uriSuffix);
    if (!wellKnowResult.success)
        return wellKnowResult;
    const {links} = wellKnowResult.data;
    if (!links)
        return WellKnowResult.Error('No links in expected well-known response');
    linksMap = new Map();
    links.forEach(link => {
        if (!relFilter || link==relFilter){
            linksMap.set(link.rel, link.href);
        }
    });

    return WellKnowResult.Success(linksMap);
}
    
async function fetchNodeInfo(domain, relFilter = null) {
    const wellKnowResult = await fetchWellKnownLinks(domain, 'nodeinfo', relFilter);
    if (!wellKnowResult.success)
        return wellKnowResult;
    const firstUrl = wellKnowResult.data.values().next().value;
    return await fetchJSON(firstUrl);
}

module.exports = {WellKnowResult, fetchNodeInfo, fetchJSON, fetchWellKnown, fetchWellKnownLinks}
