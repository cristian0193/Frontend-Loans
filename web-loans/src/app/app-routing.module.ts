import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { ClientsComponent } from './components/principal/clients/clients.component';
import { DetailComponent } from './components/principal/detail/detail.component';
import { LoansComponent } from './components/principal/loans/loans.component';
import { OutstandingComponent } from './components/principal/outstanding/outstanding.component';

const ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'outstanding', component: OutstandingComponent },
  { path: 'loans', component: LoansComponent },
  { path: 'detail/:id', component: DetailComponent },
  { path: 'client', component: ClientsComponent },
  { path: '', pathMatch: 'full', redirectTo: 'login'},
  { path: '**', pathMatch: 'full', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
