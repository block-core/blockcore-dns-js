import { DnsListEntry, ServiceListEntry } from './types.js';
import { WebRequest } from './Request.js';

export class BlockcoreDns {
	/** Call this to have data to provide an instance of the Blockcore DNS. */
	static async getDnsServers() {
		const url = `https://chains.blockcore.net/services/DNS.json`;
		const servers = await WebRequest.fetchJson<DnsListEntry[]>(url);
		return servers;
	}

	private activeServer?: string;

	constructor(nameserver: string) {
		this.setActiveServer(nameserver);
	}

	setActiveServer(url: string) {
		this.activeServer = url;
	}

	async getServicesByType(service: 'Indexer' | 'Explorer') {
		const url = `${this.activeServer}/api/dns/services/service/${service}`;
		return await WebRequest.fetchJson<ServiceListEntry[]>(url);
	}

	async getServicesByTypeAndNetwork(service: 'Indexer' | 'Explorer', symbol: string) {
		const url = `${this.activeServer}/api/dns/services/symbol/${symbol}/service/${service}`;
		return await WebRequest.fetchJson<ServiceListEntry[]>(url);
	}

	async getServicesByNetwork(symbol: string) {
		const url = `${this.activeServer}/api/dns/services/symbol/${symbol}`;
		return await WebRequest.fetchJson<ServiceListEntry[]>(url);
	}

	async getExternalIP() {
		const url = `${this.activeServer}/api/dns/ipaddress`;
		return await WebRequest.fetchText(url);
	}
}
