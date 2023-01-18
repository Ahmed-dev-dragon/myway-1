import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/User.model";
import { APIService } from "./api.service";

@Injectable({
  providedIn: "root",
})
export class UserService {
  userUrl = "/user";

  constructor(private apiService: APIService) { }

  getUsers(): Observable<User[]> {
    return this.apiService.get(this.userUrl);
  }

  getUserById(id: string): Observable<User> {
    return this.apiService.get(`${this.userUrl}/${id}`);
  }

  getResponsables(): Observable<User[]> {
    return this.apiService.get(`${this.userUrl}/responsables`);
  }

  getTeam() {
    return this.apiService.get(
      `${this.userUrl}/team/${JSON.parse(sessionStorage.getItem("user") || "")?._id
      }`
    );
  }

  addUser(user: any) {
    return this.apiService.post(this.userUrl, user);
  }

  updateUser(id: string, user: any) {
    return this.apiService.patch(`${this.userUrl}/${id}`, user);
  }

  sendVerificationEmail(email: string) {
    return this.apiService.post("/send-verification-email", {
      email,
    });
  }

  resetPassword(newData: { email: string; password: string }) {
    return this.apiService.post(`${this.userUrl}/reset_password`, newData);
  }

  changeState(body: { id: string[]; etat: "active" | "etatObjet.archive" }) {
    return this.apiService.patch(this.userUrl, body);
  }
}
