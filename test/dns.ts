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
	let servers = await dns.getDnsServers();
	t.not(servers, null);
});
