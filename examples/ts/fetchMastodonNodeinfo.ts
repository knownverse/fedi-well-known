import {fetchNodeInfo} from 'fedi-well-known'
const nodeInfo = await fetchNodeInfo('mastodon.social');
const mastodonActiveUsers = nodeInfo.data.usage.users.activeMonth;
console.log(JSON.stringify(nodeInfo.data, null, 2));