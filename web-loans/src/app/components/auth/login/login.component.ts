import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/Login/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  statusResponse: boolean
  messageError: string
  infoUser: User = {username: "", password:""};

  constructor(private userService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.statusResponse = false
    this.infoUser.username = ""
    this.infoUser.password = ""
  }

  getUsernameAndPassword() {
    this.userService.validationLogin(this.infoUser).subscribe(
      data => {
        this.statusResponse = false
        localStorage.setItem('SESSION', "OK");
        this.router.navigate(['/outstanding']);
      },
      errors => {
        this.statusResponse = true
        this.messageError = errors.error.message;
      });
  }


}
