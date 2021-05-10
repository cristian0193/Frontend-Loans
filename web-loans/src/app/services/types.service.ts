import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Type } from '../models/Types/type';

@Injectable({
  providedIn: 'root'
})
export class TypesService {

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
    "X-Lang":"ES",
  });

  urlBase = "http://localhost:8080"
  urlLoan = this.urlBase + "/types"

  constructor(private http: HttpClient) { }

  getTypes(): Observable<Type[]> {
    return this.http.get<Type[]>(this.urlLoan, {headers: this.headers})
  }

}