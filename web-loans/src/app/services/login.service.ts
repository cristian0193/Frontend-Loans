import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { User } from '../models/Login/user';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
    "X-Lang":"ES",
});

urlBase = "http://localhost:8080"

urlValidationLogin = this.urlBase + "/users"

constructor(private http: HttpClient) { }

validationLogin(infouser: User): Observable<Response> {
  return this.http.post<Response>(this.urlValidationLogin, infouser, {headers: this.headers})
}

/* validationLogin(infouser: User) {
    return this.http.post(this.urlValidationLogin, infouser, { headers: this.headers }).pipe(map(data => data));
} */
}
