import fetch, {enableFetchMocks} from 'jest-fetch-mock'
enableFetchMocks()
import {fetchNodeInfo, fetchWellKnown, fetchWellKnownLinks } from '../src/fetchNodeInfo';

describe('fetchWellKnown', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });

    it('should call fetchJSON with correct URL', async () => {
        const domain = 'example.com';
        const uriSuffix = 'some-uri';
        const expectedUrl = `https://${domain}/.well-known/${uriSuffix}`;
        fetch.mockResponseOnce(JSON.stringify({}));

        await fetchWellKnown(domain, uriSuffix);

        expect(fetch).toHaveBeenCalledWith(expectedUrl);
    });
});

describe('fetchWellKnownLinks', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });

    it('should return links map if successful', async () => {
        const domain = 'example.com';
        const uriSuffix = 'links';
        const linksResponse = {
            links: [
                { rel: 'self', href: 'https://example.com/self' },
                { rel: 'next', href: 'https://example.com/next' }
            ]
        };
        fetch.mockResponseOnce(JSON.stringify(linksResponse), { status: 200 });

        const result = await fetchWellKnownLinks(domain, uriSuffix);

        expect(result.success).toBe(true);
        expect(result.data.size).toBe(2);
        expect(result.data.get('self')).toBe('https://example.com/self');
    });

    it('should return error if no links are present', async () => {
        const domain = 'example.com';
        const uriSuffix = 'links';
        const linksResponse = {};
        fetch.mockResponseOnce(JSON.stringify(linksResponse), { status: 200 });

        const result = await fetchWellKnownLinks(domain, uriSuffix);

        expect(result.success).toBe(false);
        expect(result.error).toBe('No links in expected well-known response');
    });
});

describe('fetchNodeInfo', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });

    it('should fetch node info successfully', async () => {
        const domain = 'example.com';
        const wellKnownResponse = {
            links: [
                { rel: 'nodeinfo', href: 'https://example.com/nodeinfo' }
            ]
        };
        const nodeInfoResponse = { key: 'value' };
        fetch.mockResponseOnce(JSON.stringify(wellKnownResponse), { status: 200 });
        fetch.mockResponseOnce(JSON.stringify(nodeInfoResponse), { status: 200 });

        const result = await fetchNodeInfo(domain);

        expect(result.success).toBe(true);
        expect(result.data).toEqual(nodeInfoResponse);
    });

    it('should handle fetch errors', async () => {
        const domain = 'example.com';
        fetch.mockResponseOnce('', { status: 500 });

        const result = await fetchNodeInfo(domain);

        expect(result.success).toBe(false);
        expect(result.error).toMatch(/HTTP error! status: https:\/\/example.com\/.well-known\/nodeinfo: 500/);
    });
});