import test from 'ava';
import { BlockcoreDns } from '../src/index.js';

const createInstance = async () => {
	let dnsServers = await BlockcoreDns.getDnsServers();
	let dns = new BlockcoreDns(dnsServers[0].url);
	return dns;
};

test('create DNS server', async (t) => {
	let dns = await createInstance();
	t.not(dns, null);
});

test('get external client IP', async (t) => {
	let dns = await createInstance();
	let ip = await dns.getExternalIP();
	t.not(ip, null);
});

test('get services from first DNS server', async (t) => {
	let dns = await createInstance();
	let servers = await dns.getServicesByType('Indexer');
	t.true(servers.length > 10);
});

test('get CITY indexers from first DNS server', async (t) => {
	let dns = await createInstance();
	let servers = await dns.getServicesByTypeAndNetwork('Indexer', 'CITY');
	t.true(servers.length > 0);
});

test('get CITY services from first DNS server', async (t) => {
	let dns = await createInstance();
	let servers = await dns.getServicesByNetwork('CITY');
	t.true(servers.length > 0);
});

test('get CITY services from second DNS server', async (t) => {
	let dnsServers = await BlockcoreDns.getDnsServers();
	let dns = new BlockcoreDns(dnsServers[1].url);
	let servers = await dns.getServicesByNetwork('CITY');
	
	// When the second nameserver adds indexers for CITY, update this test.
	t.true(servers.length == 0);
});

test('get CITY services from custom DNS server', async (t) => {
	let dns = new BlockcoreDns('https://ns.blockcore.net');
	let servers = await dns.getServicesByNetwork('CITY');
	t.true(servers.length > 0);
});
