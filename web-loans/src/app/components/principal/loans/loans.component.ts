import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/Clients/client';
import { Information } from 'src/app/models/Loans/information';
import { Loan } from 'src/app/models/Loans/loan';
import { Payment } from 'src/app/models/Loans/payment';
import { Records } from 'src/app/models/Loans/records';
import { Type } from 'src/app/models/Types/type';
import { ClientService } from 'src/app/services/client.service';
import { LoansService } from 'src/app/services/loans.service';
import { TypesService } from 'src/app/services/types.service';
declare var jQuery: any;

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css']
})

export class LoansComponent implements OnInit {

  @ViewChild('closebutton1') closebutton1;
  @ViewChild('closebutton2') closebutton2;

  id: number
  name: string
  notification: string
  statusResponse: boolean
  messageError: string
  listLoan: Loan[] = []
  listClient: Client[] = []
  listTypes: Type[] = []
  information: Information
  pagination: number[]
  records: Records = {identificationClient:0, borrowedValue: 0, interestPercentage: 0};
  payment: Payment = {idLoan:0, idType:0, capital: 0, interest:0}

  constructor(private loansService: LoansService, 
              private clientService: ClientService,
              private typesService: TypesService,
              private router: Router) { }

  ngOnInit(): void {
    this.getAllLoan(1)
    this.getClients()
    this.getTypes()
  }

  getClients() {
    this.clientService.getClients().subscribe(
      data => {
        this.listClient = data
      },
      errors => {
        console.log("Error : " + errors)
      });
  }

  getTypes() {
    this.typesService.getTypes().subscribe(
      data => {
        this.listTypes = data
      },
      errors => {
        console.log("Error : " + errors)
      });
  }

  getAllLoan(page: number) {
    this.pagination = [] 
    this.loansService.getLoans(page).subscribe(
      data => {
        this.listLoan = data.loans
        for (let index = 0; index < data.pages; index++) {
          this.pagination.push(index + 1)
        }
      },
      errors => {
        console.log("Error : " + errors)
     });
  }

  getDetailLoans(idLoan: number){
    this.router.navigate(['/detail', idLoan]);
  }

  getFee(idLoan: number) {
    this.id = idLoan
    this.loansService.getInformation(idLoan).subscribe(
      data => {
        this.name = data.fullname
        this.payment.interest = data.monthlyFee
      },
      errors => {
        console.log("Error : " + errors)
     });
  }

  createLoan() {
    this.records.identificationClient = Number(this.records.identificationClient);
    this.loansService.createLoans(this.records).subscribe(
      data => {
        this.notification = data.message
        this.statusResponse = false
        this.cleanModalLoan()
        this.getAllLoan(1)
        this.closebutton1.nativeElement.click();
      },
      errors => {
        this.statusResponse = true
        this.cleanModalLoan()
        this.messageError = errors.error.message;
     });
  }

  createPayment(){
    this.payment.idLoan = this.id
    this.payment.idType = Number(this.payment.idType)
    this.loansService.createPayment(this.payment).subscribe(
      data => {
        this.notification = data.message
        this.statusResponse = false
        this.cleanModalPayment()
        this.getAllLoan(1)
        this.closebutton2.nativeElement.click();
      },
      errors => {
        this.statusResponse = true
        this.cleanModalPayment()
        this.messageError = errors.error.message;
     });
  }

  cleanModalLoan(){
    this.records.identificationClient = 0
    this.records.borrowedValue = 0
    this.records.interestPercentage = 0
  }

  cleanModalPayment(){
    this.payment.capital = 0
    this.payment.interest = 0
  }

  filterPagination(page: number){
    this.getAllLoan(page)
  }

  firstPosition(){
    this.getAllLoan(1)
  }

  lastPosition(){
    this.getAllLoan(this.pagination.length)
  }

}
