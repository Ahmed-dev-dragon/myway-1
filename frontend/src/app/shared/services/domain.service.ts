import { Injectable } from '@angular/core';
import { APIService } from 'src/app/shared/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class DomainService {
  domainUrl = '/domain';

  constructor(private apiService: APIService) { }

  getDomains() {
    return this.apiService.get(this.domainUrl);
  }
  getDomainsByCode(domains: string[]) {
    return this.apiService.get(`${this.domainUrl}/domains`, {
      domains: JSON.stringify(domains),
    });
  }

  getDomainsById(id: string) {
    return this.apiService.get(`${this.domainUrl}/${id}`);
  }

  getDomainByCode(code: string[]) {
    return this.apiService.get(`${this.domainUrl}/code/${code}`);
  }

  addDomain(domain: any) {
    return this.apiService.post(this.domainUrl, domain);
  }

  updateDomain(id: string, domain: any) {
    return this.apiService.patch(`${this.domainUrl}/${id}`, domain);
  }

  changeState(body: { id: string[]; etat: string }) {
    return this.apiService.patch(this.domainUrl, body);
  }

  domainsToTreeNodes(domains: any) {
    return domains.map((domain: any) => this.domainToTreeNode(domain));
  }

  domainToTreeNode(domain: any) {
    return {
      label: domain.translations.designation,
      data: domain,
      children: this.domainsToTreeNodes(domain.children || []),
      selectable: domain.hasTaxonomies,
    };
  }
}
