import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export  class Data {
  open: number;
  close: number;
  date: string | Date;
}


@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private baseUrl = 'http://localhost:3000';
  constructor(private httpClient: HttpClient) { }

  getInitialStatus() {
    return this.httpClient.get<Data[]>(`${this.baseUrl}/api/data`);
  }
}
