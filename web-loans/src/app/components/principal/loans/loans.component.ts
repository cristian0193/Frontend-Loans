import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Loan, Search } from 'src/app/models/Loans/loan';
import { Records } from 'src/app/models/Loans/records';
import { LoansService } from 'src/app/services/loans.service';
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
  listLoan: Loan[] = []
  pagination: number[]
  search: Search = {fullname: ""}
  records: Records = {identificationClient:0, borrowedValue: 0, interestPercentage: 0, creationDate: null};

  constructor(private loansService: LoansService, 
              private router: Router) { }

  ngOnInit(): void {
    var local = localStorage.getItem('SESSION');
    if (local != "OK") {
      this.router.navigate(['/login']);
    }
    this.getAllLoan(1)
  }

  getAllLoan(page: number) {
    this.pagination = [] 
    this.loansService.getLoansPaid(page, this.search.fullname).subscribe(
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

  cleanModalLoan(){
    this.records.identificationClient = 0
    this.records.borrowedValue = 0
    this.records.interestPercentage = 0
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
