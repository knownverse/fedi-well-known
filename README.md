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
<details>
  <summary>output</summary>
  <code>
[
  {
    "domain": "activitypub.awakari.com",
    "digest": "11eb1f1404926b45cd8a3edc8ab509ffbdd6de5c0948b4aa840b5e23d0bcee38",
    "severity": "silence",
    "comment": "Spam"
  },
  {
    "domain": "bgzashtita.es",
    "digest": "9c74ca7a36db36bf782a264ce69033cca4317c416921ee9fc87b74051cde0f7b",
    "severity": "silence",
    "comment": "Misinformation"
  },
  {
    "domain": "brighteon.social",
    "digest": "0be5721be2346e0b892e6cc0db706b6b950a0d215d9d5481e851785571a89067",
    "severity": "silence",
    "comment": "Conspiracy theories"
  },
  {
    "domain": "bsd.moe",
    "digest": "e19231735923fbb5ce6d73986339b08e5dad96c75c903b003f8827716c0a06b6",
    "severity": "silence",
    "comment": "Harassment"
  },
  {
    "domain": "fr13nd5.com",
    "digest": "86811acd84b7c3124aead2125fa22ae0a8f6175178e89e26f0fecc046094eae4",
    "severity": "silence",
    "comment": "Misinformation"
  },
  {
    "domain": "freezepeach.xyz",
    "digest": "079978fa420e3804995892d3da797cba45ab926ed31b72c2ce66a434a0eb746a",
    "severity": "silence",
    "comment": "Harassment"
  },
  {
    "domain": "krdtube.org",
    "digest": "e454341c985b667c14302990019e0045dde64a1de8572aedc7f8d171dc774917",
    "severity": "silence",
    "comment": "Misinformation"
  },
  {
    "domain": "minds.com",
    "digest": "853bdc6d75280a1491a05288cbb04c843d4b1d54bc09cddf4a5d1167029ba7f9",
    "severity": "silence",
    "comment": "Hate speech"
  },
  {
    "domain": "misskey.io",
    "digest": "4926d81556f4242cf1b7d1f4cbf63ee8c29fd5257c20bbfb25fd425f9db1351f",
    "severity": "silence",
    "comment": "Inappropriate content"
  },
  </code>
</details>
