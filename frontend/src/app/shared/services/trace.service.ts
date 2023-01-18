import { Injectable } from "@angular/core";
import { APIService } from "./api.service";

@Injectable({
  providedIn: "root",
})
export class TraceService {
  traceUrl = "/trace";

  constructor(private apiService: APIService) {}

  getTraces() {
    return this.apiService.get(this.traceUrl);
  }

  getTraceById(id: string) {
    return this.apiService.get(`${this.traceUrl}/${id}`);
  }
}
