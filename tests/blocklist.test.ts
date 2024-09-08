import fetch, {enableFetchMocks} from 'jest-fetch-mock'
enableFetchMocks()
import {fetchBlockList} from '../src/blocklists';

describe('fetchBlocklist', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it('should call fetchBlocklist with correct domain', async () => {
        const domain = 'example.com';
        const data = [{domain: 'bad-domain.com', reason: 'spam' }] ;
        
        fetch.mockResponseOnce(JSON.stringify(data));

        const result = await fetchBlockList(domain);

        expect(result.success).toBe(true);
        expect(fetch).toHaveBeenCalledWith(`https://${domain}/api/v1/instance/domain_blocks`);
    });

    it('should return error when fetchBlocklist fails', async () => {
        const domain = 'example.com';
        fetchMock.mockReject(new Error('Fetch failed'));

        const result = await fetchBlockList(domain);

        expect(result.success).toBe(false);
        expect(result.error).toMatch(/Error fetching url https:\/\/example.com\/api\/v1\/instance\/domain_blocks:/);
    });
});