import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, from } from  'rxjs';
import * as socketio from 'socket.io-client';


export  class Data {
  open: number;
  close: number;
  date: string | Date;
}


@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private baseUrl = 'http://localhost:3022';
  constructor(private httpClient: HttpClient) { }

  getInitialStatus() {
    return this.httpClient.get<Data[]>(`${this.baseUrl}/api/data`);
  }

  getUpdates() {
    let socket = socketio(this.baseUrl);
    let dataSub = new Subject<Data>();
    let dataSubObservable = from(dataSub);

    socket.on('data', (status: Data) => {
      dataSub.next(status);
    });

    return dataSubObservable;
  }
}
