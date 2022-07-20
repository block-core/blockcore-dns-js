import test from 'ava';
import { BlockcoreDns } from '../src/BlockcoreDns.js';
import { Dns } from '../src/index.js';

test('foo', (t) => {
	t.pass();
});

test('bar', async (t) => {
	let dns: Dns = { IP: '127.0.0.1' };
	t.deepEqual(dns, { IP: '127.0.0.1' });
});

test('get DNS servers', async (t) => {
	let dns = BlockcoreDns.create();
	let dnsServers = await dns.getDnsServers();
	t.not(dnsServers, null);
});

test('get services from first DNS server', async (t) => {
	let dns = BlockcoreDns.create();
	let dnsServers = await dns.getDnsServers();
	t.not(dnsServers, null);

	let dnsServer = dnsServers[0];

	// Set the active server on this instance.
	dns.setActiveServer(dnsServer.url);

	let servers = await dns.getServersByService('Indexer');
	t.true(servers.length > 10);
});

test('get CITY services from first DNS server', async (t) => {
	let dns = BlockcoreDns.create();
	let dnsServers = await dns.getDnsServers();
	t.not(dnsServers, null);

	let dnsServer = dnsServers[0];

	// Set the active server on this instance.
	dns.setActiveServer(dnsServer.url);

	let servers = await dns.getServersByServiceAndNetwork('Indexer', 'CITY');
	t.true(servers.length > 0);
});

test('get external client IP', async (t) => {
	let dns = BlockcoreDns.create();
	let dnsServers = await dns.getDnsServers();
	t.not(dnsServers, null);

	let dnsServer = dnsServers[0];

	// Set the active server on this instance.
	dns.setActiveServer(dnsServer.url);

	let ip = await dns.getExternalIP();
	t.not(ip, null);
});
