import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { LoansComponent } from './components/principal/loans/loans.component';
import { DetailComponent } from './components/principal/detail/detail.component';
import { ClientsComponent } from './components/principal/clients/clients.component';
import { OutstandingComponent } from './components/principal/outstanding/outstanding.component';

// Services
import { LoginService } from './services/login.service';
import { LoansService } from './services/loans.service';
import { ClientService } from './services/client.service';
import { TypesService } from './services/types.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    LoansComponent,
    DetailComponent,
    ClientsComponent,
    OutstandingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    LoginService,
    LoansService,
    ClientService,
    TypesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
