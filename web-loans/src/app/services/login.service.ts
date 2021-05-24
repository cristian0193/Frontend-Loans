import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { User } from '../models/Login/user';
import { Observable } from 'rxjs';
import { environment } from '.././../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
    "X-Lang":"ES",
  });
    
  urlValidationLogin = environment.urlbase + "/users"

  constructor(private http: HttpClient) { }

  validationLogin(infouser: User): Observable<Response> {
    return this.http.post<Response>(this.urlValidationLogin, infouser, {headers: this.headers})
  }

}
