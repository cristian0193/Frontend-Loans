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
  urlClient = this.urlBase + "/clients"
  urlClientById = this.urlBase + "/clients/"

  constructor(private http: HttpClient) { }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.urlClient, {headers: this.headers})
  }

  getClientById(id: number): Observable<Client> {
    return this.http.get<Client>(this.urlClientById + id, {headers: this.headers})
  }

  createClient(client: Client): Observable<Response> {
    return this.http.post<Response>(this.urlClient, client, {headers: this.headers})
  }

  updateClient(client: Client): Observable<Response> {
    return this.http.put<Response>(this.urlClient, client, {headers: this.headers})
  }

}
