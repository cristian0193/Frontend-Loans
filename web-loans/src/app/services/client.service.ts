import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../models/Clients/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
    "X-Lang":"ES",
  });

  urlBase = "http://localhost:8080"
  urlLoan = this.urlBase + "/clients"

  constructor(private http: HttpClient) { }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.urlLoan, {headers: this.headers})
  }

}
