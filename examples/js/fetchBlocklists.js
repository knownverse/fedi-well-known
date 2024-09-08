import {fetchBlocklist} from 'fedi-well-known'
const resp = await fetchBlocklist('mastodon.social');
if (resp.success)
{
    const blocklist = resp.data;
    console.log(JSON.stringify(blocklist, null, 2));
}