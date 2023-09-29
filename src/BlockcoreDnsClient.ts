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

		try {
			return await WebRequest.fetchJson<ServiceListEntry[]>(url);
		} catch (err) {
			console.warn(`No services found for ${url}`);
			console.error(err);
			return <ServiceListEntry[]>[];
		}
	}

	async getServicesByTypeAndNetwork(service: string, symbol: string) {
		const url = `${this.activeServer}/api/dns/services/symbol/${symbol}/service/${service}`;

		try {
			return await WebRequest.fetchJson<ServiceListEntry[]>(url);
		} catch (err) {
			console.warn(`No services found for ${url}`);
			console.error(err);
			return <ServiceListEntry[]>[];
		}
	}

	async getServicesByNetwork(symbol: string) {
		const url = `${this.activeServer}/api/dns/services/symbol/${symbol}`;

		try {
			return await WebRequest.fetchJson<ServiceListEntry[]>(url);
		} catch (err) {
			console.warn(`No services found for ${url}`);
			console.error(err);
			return <ServiceListEntry[]>[];
		}
	}

	async getExternalIP() {
		const url = `${this.activeServer}/api/dns/ipaddress`;

		try {
			return await WebRequest.fetchText(url);
		} catch (err) {
			console.warn(`Unable to find external IP.`);
			console.error(err);
			return '';
		}
	}
}
