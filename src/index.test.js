import fetchMock from 'jest-fetch-mock'
fetchMock.enableFetchMocks()
import { WellKnowResult, fetchNodeInfo, fetchJSON, fetchWellKnown, fetchWellKnownLinks } from './index.js';

describe('WellKnowResult', () => {
    it('should create a successful result', () => {
        const data = { key: 'value' };
        const result = WellKnowResult.Success(data);
        expect(result.success).toBe(true);
        expect(result.data).toEqual(data);
        expect(result.error).toBeNull();
    });

    it('should create an error result', () => {
        const error = 'An error occurred';
        const result = WellKnowResult.Error(error);
        expect(result.success).toBe(false);
        expect(result.data).toBeNull();
        expect(result.error).toBe(error);
    });
});

describe('fetchJSON', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });

    it('should return success result for successful response', async () => {
        const url = 'https://example.com';
        const data = { key: 'value' };
        fetch.mockResponseOnce(JSON.stringify(data), { status: 200 });

        const result = await fetchJSON(url);
        console.log(result);
        expect(result.success).toBe(true);
        expect(result.data).toEqual(data);
        expect(result.error).toBeNull();
    });

    it('should return error result for non-200 response', async () => {
        const url = 'https://example.com';
        fetch.mockResponseOnce('', { status: 500 });

        const result = await fetchJSON(url);
        expect(result.success).toBe(false);
        expect(result.error).toMatch(/HTTP error! status: https:\/\/example.com: 500/);
        expect(result.data).toBeNull();
    });

    it('should return error result for fetch exception', async () => {
        const url = 'https://example.com';
        fetch.mockReject(new Error('Fetch error'));

        const result = await fetchJSON(url);
        expect(result.success).toBe(false);
        expect(result.error).toMatch(/Error fetching url https:\/\/example.com: Fetch error/);
        expect(result.data).toBeNull();
    });
});

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