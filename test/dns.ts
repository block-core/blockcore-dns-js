import test from 'ava';
import { Dns } from '../src/index.js';

test('foo', (t) => {
	t.pass();
});

test('bar', async (t) => {
	let dns: Dns = { IP: '127.0.0.1' };
	t.is(dns, { IP: '127.0.0.1' });
});
