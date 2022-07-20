import { BlockcoreDnsOptions } from './options.js';
import fetch from 'node-fetch';
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
		const servers = await this.fetchUrl<DnsListEntry[]>(url);
		return servers;
	}

	async getServersByService(service: 'Indexer' | 'Explorer') {
		const url = `${this.activeServer}/api/dns/services/service/${service}`;
		return await this.fetchUrl<ServiceListEntry[]>(url);
	}

	private async fetchUrl<T>(url: string): Promise<T> {
		const response = await fetch(url, {
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

		return response.json() as Promise<T>;
	}
}
