import { DnsListEntry, ServiceListEntry } from './types.js';
import { WebRequest } from './Request.js';
import { BlockcoreDnsClient } from './BlockcoreDnsClient.js';

/** The BlockcoreDns class will give you access to all known nameservers and all services registered with those nameservers. */
export class BlockcoreDns {
	private nameservers: DnsListEntry[] = [];
	private services: ServiceListEntry[] = [];
	private dns: BlockcoreDnsClient;

	constructor() {
		this.dns = new BlockcoreDnsClient('');
	}

	private async getDnsServers() {
		const url = `https://chains.blockcore.net/services/DNS.json`;
		const servers = await WebRequest.fetchJson<DnsListEntry[]>(url);
		return servers;
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
	 */
	async load(nameservers?: DnsListEntry[]) {
		this.nameservers = nameservers || (await this.getDnsServers());

		const servicesMap = new Map();

		for (let i = 0; i < this.nameservers.length; i++) {
			const nameserver = this.nameservers[i];

			if (!nameserver) {
				continue;
			}

			this.dns.setActiveServer(nameserver.url);

			const services = await this.dns.getServicesByType('Indexer');

			services.forEach((item) => servicesMap.set(item.domain, { ...servicesMap.get(item.domain), ...item }));
		}

		this.services = Array.from(servicesMap.values());
	}
}
