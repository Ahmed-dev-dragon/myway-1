import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { API } from './api.service'

@Injectable({
  providedIn: 'root',
})
export class RecruteurService {
  constructor(private http: HttpClient) {}
  getAllRecruteurs() {
    return this.http.get(API + '/recruteur')
  }
  getRecruteurById(id: any) {
    return this.http.get(API + '/recruteur/' + id)
  }
  public postReview(review: any, id: any) {
    return this.http.post(API + '/recruteur/review/' + id, review)
  }
  public postEntretien(entretien: any, id: any) {
    return this.http.post(API + '/recruteur/entretien/' + id, entretien)
  }
}
