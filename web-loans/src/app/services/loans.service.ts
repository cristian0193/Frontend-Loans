import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Information } from '../models/Loans/information';
import { Consults, Loan } from '../models/Loans/loan';
import { Payment, Payments } from '../models/Loans/payment';
import { Records } from '../models/Loans/records';
import { Response } from '../models/Shared/response';


@Injectable({
  providedIn: 'root'
})
export class LoansService {

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
    "X-Lang":"ES",
  });

  urlBase = "http://localhost:8080"
  urlLoan = this.urlBase + "/loans?page="
  urlCreateLoan = this.urlBase + "/loans"
  urlPayment = this.urlBase + "/loans/payment"
  urlInformation = this.urlBase + "/loans/information/"
  urlPayments = this.urlBase + "/loans/historial/"

  constructor(private http: HttpClient) { }

  getLoans(page: number): Observable<Consults> {
    return this.http.get<Consults>(this.urlLoan + page, {headers: this.headers})
  }

  getInformation(idLoan: number): Observable<Information> {
    return this.http.get<Information>(this.urlInformation + idLoan, {headers: this.headers})
  }

  getPlayments(idLoan: number): Observable<Payments[]> {
    return this.http.get<Payments[]>(this.urlPayments + idLoan, {headers: this.headers})
  }

  createLoans(record: Records): Observable<Response> {
    return this.http.post<Response>(this.urlCreateLoan, record, {headers: this.headers})
  }

  createPayment(payment: Payment): Observable<Response> {
    return this.http.post<Response>(this.urlPayment, payment, {headers: this.headers})
  }

}
