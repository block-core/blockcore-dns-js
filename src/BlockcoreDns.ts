import { BlockcoreDnsOptions } from './options.js';
import fetch from 'node-fetch';

export class BlockcoreDns {
	static defaultOptions: BlockcoreDnsOptions = {
		baseUrl: 'https://chains.blockcore.net',
	};

	static create() {
		const dns = new BlockcoreDns();
		return dns;
	}

	constructor(private options: BlockcoreDnsOptions = BlockcoreDns.defaultOptions) {}

	async getDnsServers() {
		const url = `${this.options.baseUrl}/services/BLOCKCORE-DNS.json`;

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

		const servers = await response.json();
		return servers;
	}
}
