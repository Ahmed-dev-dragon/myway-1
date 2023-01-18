import { Injectable } from '@angular/core';
import { APIService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  groupUrl = '/group';

  constructor(private apiService: APIService) { }

  getGroups() {
    return this.apiService.get(this.groupUrl);
  }

  getGroupById(id: string) {
    return this.apiService.get(`${this.groupUrl}/${id}`);
  }

  addGroup(group: any) {
    return this.apiService.post(this.groupUrl, group);
  }
  updateGroup(id: string, group: any) {
    return this.apiService.patch(`${this.groupUrl}/${id}`, group);
  }

  changeState(groupsIds: string[], state: string) {
    return this.apiService.patch(this.groupUrl, {
      id: groupsIds,
      etat: state,
    });
  }
}
