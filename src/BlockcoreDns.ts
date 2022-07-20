import { BlockcoreDnsOptions } from './options.js';
import fetch, { Response } from 'node-fetch';
import { DnsListEntry } from './DnsListEntry.js';
import { ServiceListEntry } from './ServiceListEntry.js';

export class BlockcoreDns {
	static defaultOptions: BlockcoreDnsOptions = {
		baseUrl: 'https://chains.blockcore.net',
	};

	static create() {
		const dns = new BlockcoreDns();
		return dns;
	}

	private activeServer?: string;

	constructor(private options: BlockcoreDnsOptions = BlockcoreDns.defaultOptions) {}

	setActiveServer(url: string) {
		this.activeServer = url;
	}

	async getDnsServers() {
		const url = `${this.options.baseUrl}/services/DNS.json`;
		const servers = await this.fetchJson<DnsListEntry[]>(url);
		return servers;
	}

	async getServersByService(service: 'Indexer' | 'Explorer') {
		const url = `${this.activeServer}/api/dns/services/service/${service}`;
		return await this.fetchJson<ServiceListEntry[]>(url);
	}

	async getServersByServiceAndNetwork(service: 'Indexer' | 'Explorer', symbol: string) {
		const url = `${this.activeServer}/api/dns/services/symbol/${symbol}/service/${service}`;
		return await this.fetchJson<ServiceListEntry[]>(url);
	}

	async getExternalIP() {
		const url = `${this.activeServer}/api/dns/ipaddress`;
		return await this.fetchText(url);
	}

	private async fetchText(url: string): Promise<string> {
		const response = await this.fetchUrl(url);
		return response.text();
	}

	private async fetchJson<T>(url: string): Promise<T> {
		const response = await this.fetchUrl(url);
		return response.json() as Promise<T>;
	}

	private async fetchUrl(url: string): Promise<Response> {
		return await fetch(url, {
			method: 'GET',
			// mode: 'cors',
			// cache: 'no-cache',
			// credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
			},
			redirect: 'follow',
			referrerPolicy: 'no-referrer',
		});
	}
}
