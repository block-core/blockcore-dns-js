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
