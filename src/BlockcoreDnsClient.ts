import { ServiceListEntry } from './types.js';
import { WebRequest } from './Request.js';

export class BlockcoreDnsClient {
	private activeServer?: string;

	constructor(nameserver: string) {
		this.setActiveServer(nameserver);
	}

	setActiveServer(url: string) {
		this.activeServer = url;
	}

	async getServicesByType(service: string) {
		const url = `${this.activeServer}/api/dns/services/service/${service}`;
		return await WebRequest.fetchJson<ServiceListEntry[]>(url);
	}

	async getServicesByTypeAndNetwork(service: string, symbol: string) {
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
