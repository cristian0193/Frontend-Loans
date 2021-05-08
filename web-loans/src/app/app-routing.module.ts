import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { LoansComponent } from './components/principal/loans/loans.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';

const ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'loans', component: LoansComponent },
  { path: '', pathMatch: 'full', redirectTo: 'login'},
  { path: '**', pathMatch: 'full', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
