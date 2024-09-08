# Fetching Fediverse public/operational data

[![npm](https://img.shields.io/npm/v/fedi-well-known.svg)](https://www.npmjs.com/package/fedi-well-known)
[![npm](https://github.com/knownverse/fedi-well-known/actions/workflows/node.js.yml/badge.svg)](https://github.com/knownverse/fedi-well-known/actions)
[![npm](https://codecov.io/gh/knownverse/fedi-well-known/branch/master/graph/badge.svg)](https://codecov.io/gh/knownverse/fedi-well-known)
[![NPM](https://img.shields.io/npm/l/fedi-well-known)](https://opensource.org/license/mit)

[JavaScript examples](https://github.com/knownverse/fedi-well-known/tree/master/examples/js) | [TypeScript examples](https://github.com/knownverse/fedi-well-known/tree/master/examples/ts)

### NodeInfo
```js
import {fetchNodeInfo} from 'fedi-well-known'
const nodeInfo = await fetchNodeInfo('mastodon.social');
const mastodonActiveUsers = nodeInfo.data.usage.users.activeMonth;
console.log(JSON.stringify(nodeInfo.data, null, 2));
```

<details>
<summary>output</summary>
<code>
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
</code>
</details>

### Blocklist
```js
import {fetchBlockList} from 'fedi-well-known'
const resp = await fetchBlockList('mastodon.social');
if (resp.success)
{
    const blocklist = resp.data;
    console.log(JSON.stringify(blocklist, null, 2));
}
```
