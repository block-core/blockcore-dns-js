export interface DnsListEntry {
	url: string;
	contact: string;
}

export interface ServiceListEntry {
	domain: string,
    symbol: string,
    service: string,
    ttl: number,
    online: boolean
}
