import { Taxonomie } from 'src/app/shared/models/Taxonomie.model';
import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { APIService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class TaxonomieService {
  taxonomieUrl = '/taxonomie';

  constructor(private apiService: APIService) {}

  getTaxonomies() {
    return this.apiService.get(this.taxonomieUrl);
  }

  getTaxonomiesById(id: string) {
    return this.apiService.get(`${this.taxonomieUrl}/${id}`);
  }

  getTaxonomieByCode(code: string[]) {
    return this.apiService.get(
      `${this.taxonomieUrl}/code/${JSON.stringify(code)}`
    );
  }

  addTaxonomie(taxonomie: any, taxonomieCode?: any) {
    return this.apiService.post(
      this.taxonomieUrl,
      taxonomie,
      taxonomieCode
        ? {
            code: taxonomieCode,
          }
        : {}
    );
  }

  updateTaxonomie(id: string, taxonomie: any) {
    return this.apiService.patch(`${this.taxonomieUrl}/${id}`, taxonomie);
  }

  changeState(body: { id: string[]; etat: string }) {
    return this.apiService.patch(this.taxonomieUrl, body);
  }

  taxonomiesToTreeNodes(taxonomies: any[]) {
    const recF = (taxonomies: any[]) => {
      let groups: any = [];
      taxonomies.map((taxonomie: any) => {
        if (
          !groups.find((group: any) => {
            return group.domain._id == taxonomie.domain?._id;
          }) &&
          taxonomie.domain?._id
        ) {
          groups.push({
            domain: taxonomie.domain,
            taxonomies: [taxonomie],
          });
        } else if (taxonomie.domain?._id) {
          groups
            .find((group: any) => group.domain._id == taxonomie.domain._id)
            .taxonomies.push(taxonomie);
        } else {
          groups.push(taxonomie);
        }

        if (taxonomie.children?.length) {
          taxonomie.children = recF(taxonomie.children);
        }
      });

      return groups;
    };
    taxonomies = recF(taxonomies);

    let taxonomiesNodes: any = taxonomies.map((taxonomie: any) => {
      return this.taxonomieToTreeNode(taxonomie);
    });

    return taxonomiesNodes;
  }

  taxonomieToTreeNode(taxo: any): TreeNode {
    let tempTaxo: any = {
      data: taxo.domain ? taxo.domain : taxo,
      children: [],
    };

    if (taxo.taxonomies?.length) {
      for (let t of taxo.taxonomies) {
        tempTaxo.children.push(this.taxonomieToTreeData(t));
      }
    }

    return tempTaxo;
  }

  taxonomieToTreeData(taxonomie: any) {
    let tempTaxonomie: any = {
      data: taxonomie,
      children: [],
    };
    if (taxonomie.children.length) {
      for (let child of <Taxonomie[]>taxonomie.children) {
        tempTaxonomie.children.push(this.taxonomieToTreeNode(child));
      }
    }

    return tempTaxonomie;
  }
  // @ts-ignore
  transformDomain(domain: any, domains = null) {
    if (domain.children.length && !domain.taxonomies.length) {
      return {
        data: domain,
        children: domain.children.map((child: any) =>
          this.transformDomain(child)
        ),
      };
    } else if (
      (domain.children.length && domain.taxonomies.length) ||
      (!domain.children.length && domain.taxonomies.length)
    ) {
      let taxonomies = domain.taxonomies;
      if (domains)
        taxonomies = domain.taxonomies.filter(
          // @ts-ignore
          (taxonomie: any) => taxonomie.parent == domains._id
        );
      // for (let taxonomie of domain.taxonomies) {
      //   console.log('taxonomie parent', taxonomie.parent);
      // }
      let obj = {
        data: domain,
        children: taxonomies.map((taxonomie: any) =>
          this.transformTaxonomie(taxonomie, domain, taxonomie.children.length)
        ),
      };
      // domain.taxonomies = [];
      return obj;
    } else if (!domain.children.length && !domain.taxonomies.length) {
      return {
        data: domain,
        children: [],
      };
    }
  }

  transformTaxonomie(taxonomie: any, domain: any, taxonomieLength: number) {
    return {
      data: taxonomie,
      children: taxonomieLength
        ? domain?.children.map((child: any) =>
            this.transformDomain(child, taxonomie)
          )
        : domain?.children.map((child: any) => {
            let obj = {
              data: { ...child, taxonomies: [] },
              children: [],
            };
            return obj;
          }),
    };
    // if (taxonomie.children?.length) {
    //   taxonomie.children.map((child: any) => {
    //     return {
    //       data: child,
    //       children: domain.children.map((domainChild: any) =>
    //         this.transformDomain(domainChild)
    //       ),
    //     };
    //   });
    // }
  }

  // domainsToTreeData(domains: any[]) {
  //   const recF = (domain: any, taxonomies: any) => {
  //     let dom: any = {
  //       domain: domain,
  //       taxonomies: [],
  //     };
  //     if (taxonomies.length) {
  //       taxonomies.map((taxonomie: any) => {
  //         let tempTaxo = {
  //           taxonomie: taxonomie,
  //           domains: domain.children.map((dom: any) => {
  //             return recF(dom, taxonomie.children);
  //           }),
  //         };
  //         dom.taxonomies.push(tempTaxo);
  //       });
  //     } else if (domain.children.length) {
  //       console.log('children', domain.children);

  //       console.log(domain.code, '==============', domain.taxonomies);

  //       domain.children = domain.children.map((domain: any) => {
  //         return recF(domain, domain.taxonomies);
  //       });
  //     }

  //     return dom;
  //   };

  //   domains = domains.map((domain: any) => recF(domain, domain.taxonomies));
  //   // console.log('🚀  domains', domains);
  //   domains = domains.map((domain: any) => this.transformDomain(domain));
  //   // domains = domains.map((domain: any) =>
  //   //   this.transformDomain(recF(domain, domain.taxonomies))
  //   // );
  //   console.log('🚀  domains', domains);
  //   return domains;
  // }

  // transformDomain(data: any) {
  //   let tempDomain: any = {
  //     data: data.domain,
  //     children: [],
  //   };

  //   // console.log('domain', data.domain);
  //   // console.log('taxonomie', data.taxonomies);

  //   if (data.taxonomies?.length) {
  //     for (let t of data.taxonomies) {
  //       // console.log('🚀 ~ taxonomie', t);
  //       tempDomain.children.push(this.transformTaxonomie(t));
  //     }
  //   } else if (data.domain?.children?.length) {
  //     for (let d of data.domain.children) {
  //       // if (d.taxonomies?.length || d.children?.length)
  //       tempDomain.children.push(this.transformDomain(d));
  //     }
  //   }

  //   return tempDomain;
  // }

  // transformTaxonomie(data: any) {
  //   let tempTaxonomie: any = {
  //     data: data.taxonomie,
  //     children: [],
  //   };
  //   if (data.domains?.length) {
  //     for (let child of data.domains) {
  //       tempTaxonomie.children.push(this.transformDomain(child));
  //     }
  //   } else {
  //     // console.log('data.taxonomie', data.taxonomie);

  //     tempTaxonomie.children = data.taxonomie?.children.map(
  //       (taxonomie: any) => {
  //         return this.transformTaxonomie({ taxonomie: taxonomie });
  //       }
  //     );
  //   }

  //   return tempTaxonomie;
  // }

  taxonomiesToTreeNodesForInput(
    taxonomie: any,
    taxonomieType: 'single' | 'multiple'
  ) {
    let taxonomiesNodes = [];
    if (taxonomie?.children) {
      for (let taxo of <Taxonomie[]>taxonomie.children) {
        taxonomiesNodes.push(
          this.taxonomieToTreeNodeForInput(taxo, taxonomieType)
        );
      }
    }

    if (taxonomie)
      taxonomiesNodes.push({
        label: 'ajouter',
        data: taxonomie,
        key: `ajouter-${taxonomie._id}`,
        icon: 'pi pi-plus',
        // @ts-ignore
        children: [],
      });

    return taxonomiesNodes;
  }

  taxonomieToTreeNodeForInput(
    taxo: Taxonomie,
    taxonomieType: 'single' | 'multiple'
  ): TreeNode {
    let taxonomieTreeNodes: TreeNode[] = [];

    if (taxo.children.length) {
      for (let t of taxo.children) {
        taxonomieTreeNodes.push(
          this.taxonomieToTreeNodeForInput(t, taxonomieType)
        );
      }
    }
    taxonomieTreeNodes.push({
      label: 'ajouter',
      data: taxo,
      key: `ajouter-${taxo._id}`,
      icon: 'pi pi-plus',
      // @ts-ignore
      children: [],
    });
    // @ts-ignore
    let taxonomiesNode: any = {
      label: taxo.translations?.designation,
      data: taxo,
      key: taxo._id,
      icon: taxo.logo || ' ',
      children: taxonomieTreeNodes,
    };

    if (taxonomieType == 'multiple') delete taxonomiesNode.children;
    return taxonomiesNode;
  }
  taxonomiesToTreeNodesForSelection(
    domain: any,
    taxonomieType: 'single' | 'multiple'
  ) {
    let taxonomiesNodes = [];
    if (domain?.taxonomies) {
      for (let taxo of domain.taxonomies) {
        taxonomiesNodes.push(
          this.taxonomieToTreeNodeForSelection(
            taxo,
            taxonomieType,
            domain.children
          )
        );
      }
    }

    if (domain)
      taxonomiesNodes.push({
        label: 'ajouter',
        code: domain.code,
        data: domain,
        key: `ajouter-${domain._id}`,
        icon: 'pi pi-plus',
        // @ts-ignore
        children: [],
      });

    return taxonomiesNodes;
  }

  taxonomieToTreeNodeForSelection(
    taxo: Taxonomie,
    taxonomieType: 'single' | 'multiple',
    domain: any = []
  ): TreeNode {
    let taxonomieTreeNodes: TreeNode[] = [];

    if (taxo.children.length) {
      for (let t of taxo.children) {
        let domainChild = domain.find((d: any) => d._id == t.domain);
        if (domainChild) domainChild = domainChild.children;
        else domainChild = [];

        taxonomieTreeNodes.push(
          this.taxonomieToTreeNodeForSelection(t, taxonomieType, domainChild)
        );
      }
    }

    if (domain.length)
      taxonomieTreeNodes.push({
        label: 'ajouter',
        data: taxo,
        key: `ajouter-${taxo._id}`,
        icon: 'pi pi-plus',
        // @ts-ignore
        children: [],
      });
    // @ts-ignore
    let taxonomiesNode: any = {
      label: taxo.translations?.designation,
      data: taxo,
      key: taxo._id,
      icon: taxo.logo || ' ',
      children: taxonomieTreeNodes,
    };

    if (taxonomieType == 'multiple') delete taxonomiesNode.children;
    return taxonomiesNode;
  }

  domainToTaxonomie(taxonomies: Taxonomie[]) {
    let data = taxonomies.map((taxonomie: any) => {
      return {
        data: taxonomie,
        label: taxonomie.translations.designation,
        key: taxonomie._id,
      };
    });
    data.push({
      label: 'ajouter',
      data: '',
      key: `ajouter`,
      //@ts-ignore
      icon: 'pi pi-plus',
    });
    return data;
  }
}
