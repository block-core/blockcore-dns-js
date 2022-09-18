<p align="center">
  <p align="center">
    <img src="https://avatars3.githubusercontent.com/u/53176002?s=200&v=4" height="100" alt="Blockcore" />
  </p>
  <h3 align="center">
    Blockcore DNS Provider
  </h3>
  <p align="center">
    DNS Provider package to query and resolve dynamic and decentralized DNS entries
  </p>
  <p align="center">
      <a href="https://github.com/block-core/blockcore-dns-js/actions/workflows/build.yml"><img src="https://github.com/block-core/blockcore-dns-js/actions/workflows/build.yml/badge.svg" /></a>   <a href="https://github.com/block-core/blockcore-dns-js/actions/workflows/release.yml"><img src="https://github.com/block-core/blockcore-dns-js/actions/workflows/release.yml/badge.svg" /></a>
  </p>
  <p align="center"><em>Work-in-Progress - use with caution!</em></p>
</p>

# Blockcore DNS Provider

## Install

```sh
npm install @blockcore/dns
```

**Warning:** This package is native [ESM](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) and does not provide a CommonJS export. If your project uses CommonJS, you'll have to [convert to ESM](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c) or use the [dynamic `import()`](https://v8.dev/features/dynamic-import) function.


## Usage

```ts
import { BlockcoreDns } from '@blockcore/dns';

let dns = new BlockcoreDns();

// This relies on a central nameserver registry:
await dns.load();
let indexers = await dns.getServicesByType('Indexer');
```

Get servers from known nameservers:

```ts
import { BlockcoreDns } from '@blockcore/dns';

let dns = new BlockcoreDns();

// This relies on fixed set of nameservers:
await dns.load({ url: 'https://ns.blockcore.net', contact: 'post@blockcore.net' });
let indexers = await dns.getServicesByType('Indexer');
```

You can create an load the nameservers using this static function:

```ts
let dnsServers = await BlockcoreDns.getDnsServers();
dns.setActiveServer(dnsServers[0].url);

await dns.getServicesByType('Indexer');
await dns.getServicesByNetwork('CITY');
await dns.getServicesByTypeAndNetwork('Indexer', 'CITY');
await dns.getExternalIP();
```
