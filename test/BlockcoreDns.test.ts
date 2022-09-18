import test from 'ava';
import { BlockcoreDns } from '../src/index.js';

let dns: BlockcoreDns;

const createInstance = async () => {
	if (!dns) {
		dns = new BlockcoreDns();
		await dns.load();
	}

	return dns;
};

test.serial('get online services and verify network', async (t) => {
	let dns = await createInstance();
	let services = dns.getOnlineServicesByNetwork('CITY');

	t.not(services, null);
	t.assert(services[0].symbol === 'CITY');
});

test.serial('allow custom list of nameservers', async (t) => {
	let dns = new BlockcoreDns();
	await dns.load([
		{ url: 'https://ns.blockcore.net', contact: 'post@blockcore.net' },
		{
			url: 'https://ns.coinvault.io',
			contact: 'post@coinvault.io',
		},
	]);

	let services = dns.getOnlineServicesByNetwork('STRAX');

	t.not(services, null);
	t.assert(services[0].symbol === 'STRAX');

	let ip = await dns.api.getExternalIP();
	t.not(ip, null);
});
