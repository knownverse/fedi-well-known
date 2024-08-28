## Fetching Fediverse server typical requests

### NodeInfo
```
const fedi_wk = require('fedi-well-known');
const nodeInfo = fedi_wk.fetchNodeInfo('mastodon.social');
const mastodonActiveUsers = res.data.usage.users.activeMonth;
console.log(nodeInfo);
```

output example:
```
{
  version: '2.0',
  software: { name: 'mastodon', version: '4.3.0-nightly.2024-08-28' },
  protocols: [ 'activitypub' ],
  services: { outbound: [], inbound: [] },
  usage: {
    users: { total: 2071007, activeMonth: 231042, activeHalfyear: 566733 },
    localPosts: 102117777
  },
  openRegistrations: true,
  metadata: {
    nodeName: 'Mastodon',
    nodeDescription: 'The original server operated by the Mastodon gGmbH non-profit'
  }
}
```