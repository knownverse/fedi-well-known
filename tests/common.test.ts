import fetch, {enableFetchMocks} from 'jest-fetch-mock'
enableFetchMocks()
import { WellKnowResult, fetchJSON} from '../src/common';

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