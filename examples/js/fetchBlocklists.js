import {fetchBlockList} from 'fedi-well-known'
const resp = await fetchBlockList('mastodon.social');
if (resp.success)
{
    const blocklist = resp.data;
    console.log(JSON.stringify(blocklist, null, 2));
}