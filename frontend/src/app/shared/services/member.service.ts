import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Member } from "../models/Member.model";
import { APIService } from "./api.service";

@Injectable({
  providedIn: "root",
})
export class MemberService {
  memberUrl = "/member";

  constructor(private apiService: APIService) { }

  getMembers(): Observable<Member[]> {
    return this.apiService.get(this.memberUrl);
  }

  getMemberById(id: string): Observable<Member> {
    return this.apiService.get(`${this.memberUrl}/${id}`);
  }

  addMember(member: any) {
    return this.apiService.post(this.memberUrl, member);
  }

  updateMember(id: string, member: any) {
    return this.apiService.patch(`${this.memberUrl}/${id}`, member);
  }

  changeState(body: { id: string[]; etat: "active" | "etatObjet.archive" }) {
    return this.apiService.patch(this.memberUrl, body);
  }
}
