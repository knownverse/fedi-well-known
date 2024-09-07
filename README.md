## Fetching Fediverse server typical requests

### NodeInfo
```js
import {fetchNodeInfo} from 'fedi-well-known'
const nodeInfo = await fetchNodeInfo('mastodon.social');
const mastodonActiveUsers = nodeInfo.data.usage.users.activeMonth;
const mastodonActiveUsers = nodeInfo.data.usage.users.activeMonth;
```

output example:
```json
{
  "version": "2.0",
  "software": {
    "name": "mastodon",
    "version": "4.3.0-nightly.2024-09-03"
  },
  "protocols": [
    "activitypub"
  ],
  "services": {
    "outbound": [],
    "inbound": []
  },
  "usage": {
    "users": {
      "total": 2090410,
      "activeMonth": 244048,
      "activeHalfyear": 574110
    },
    "localPosts": 103183044
  },
  "openRegistrations": true,
  "metadata": {
    "nodeName": "Mastodon",
    "nodeDescription": "The original server operated by the Mastodon gGmbH non-profit"
  }
}
```
