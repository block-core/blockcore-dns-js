import { DnsListEntry, ServiceListEntry } from './types.js';
import { WebRequest } from './Request.js';
import { BlockcoreDnsClient } from './BlockcoreDnsClient.js';

/** The BlockcoreDns class will give you access to all known nameservers and all services registered with those nameservers. */
export class BlockcoreDns {
	private nameservers: DnsListEntry[] = [];
	private services: ServiceListEntry[] = [];
	public api: BlockcoreDnsClient;

	constructor() {
		this.api = new BlockcoreDnsClient('');
	}

	public async getDnsServers() {
		const url = `https://chains.blockcore.net/services/DNS.json`;
		try {
			const servers = await WebRequest.fetchJson<DnsListEntry[]>(url);
			return servers;
		} catch (err) {
			console.warn(`Unable to retrieve DNS list, using fixed list instead. URL: ${url}`);
			console.error(err);
			return [
				{
					url: 'https://ns.blockcore.net',
					contact: 'post@blockcore.net',
				},
				{
					url: 'https://ns.coinvault.io',
					contact: 'post@coinvault.io',
				},
				{
					url: 'https://ns.seniorblockchain.io',
					contact: 'post@seniorblockchain.io',
				},
			];
		}
	}

	public getNameServers() {
		return this.nameservers;
	}

	public getOnlineServicesByNetwork(network: string) {
		return this.services.filter((s) => s.symbol === network && s.online === true);
	}

	public getServices() {
		return this.services;
	}

	/** Attempts to load the latest status of all services from all known nameservers. This method can be called
	 * at intervals to ensure latest status is available.
	 *
	 * By supplying the serviceType, a different than default list of services can be provided in the .getServices() method.
	 *
	 * Supply null as parameter for serviceType to avoid preloading services.
	 */
	async load(nameservers?: DnsListEntry[], serviceType = 'Indexer') {
		this.nameservers = nameservers || (await this.getDnsServers());

		const servicesMap = new Map();

		for (let i = 0; i < this.nameservers.length; i++) {
			const nameserver = this.nameservers[i];

			if (!nameserver) {
				continue;
			}

			this.api.setActiveServer(nameserver.url);

			if (serviceType) {
				try {
					const services = await this.api.getServicesByType(serviceType);
					services.forEach((item) => servicesMap.set(item.domain, { ...servicesMap.get(item.domain), ...item }));
				} catch (err) {
					console.warn(`Unable to load services from ${nameserver.url}`);
					console.error(err);
				}
			}
		}

		this.services = Array.from(servicesMap.values());

		// Set randomly active server after load is complete.
		const randomIndex = this.getRandomInt(this.nameservers.length);
		this.api.setActiveServer(this.nameservers[randomIndex]!.url);
	}

	private getRandomInt(max: number) {
		return Math.floor(Math.random() * max);
	}
}
