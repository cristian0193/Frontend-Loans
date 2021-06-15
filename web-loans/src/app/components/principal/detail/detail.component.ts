import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Information } from 'src/app/models/Loans/information';
import { Payments } from 'src/app/models/Loans/payment';
import { LoansService } from 'src/app/services/loans.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  listPayments: Payments[] = []
  information: Information
  validateArrears: string
  

  constructor(private loansService: LoansService, 
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    var local = localStorage.getItem('SESSION');
    if (local != "OK") {
      this.router.navigate(['/login']);
    }
    
    var parameters = this.activatedRoute.snapshot.params.id
    this.getInformationLoan(parameters)
    this.getPayments(parameters)
  }

  getInformationLoan(idLoan: number) {
    this.loansService.getInformation(idLoan).subscribe(
      data => {
        this.information = data
        this.information.loanDate = data.loanDate.split("T")[0]
        this.validateArrears = data.monthsArrears > 0 ? "background-color:lightcoral;" : ""
      },
      errors => {
        console.log("Error : " + errors)
     });
  }

  getPayments(idLoan: number) {
    this.loansService.getPlayments(idLoan).subscribe(
      data => {
        this.listPayments = data
      },
      errors => {
        console.log("Error : " + errors)
      });
  }

}
