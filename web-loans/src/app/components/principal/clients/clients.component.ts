import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/Clients/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  @ViewChild('closebutton1') closebutton1;

  isVisible: boolean = false
  listClient: Client[] = []
  notification: string
  statusResponse: boolean
  messageError: string
  statusButon : boolean
  client: Client = {identification :0, fullname : "", address : "", mobile : ""}

  constructor(private clientService: ClientService,
              private router: Router) { }

  ngOnInit(): void {
    var local = localStorage.getItem('SESSION');
    if (local != "OK") {
      this.router.navigate(['/login']);
    }

    this.getClients()
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

  getClientById(id: number){
    this.isVisible = true
    this.statusButon = false
    this.clientService.getClientById(id).subscribe(
      data => {
        this.client.identification = data.identification
        this.client.fullname = data.fullname
        this.client.address = data.address
        this.client.mobile = data.mobile
      },
      errors => {
        console.log("Error : " + errors)
      });
  }

  createClient() {
    this.client.identification = Number(this.client.identification);
    this.clientService.createClient(this.client).subscribe(
      data => {
        this.statusResponse = false
        this.clear()
        this.getClients()
        this.closebutton1.nativeElement.click();
      },
      errors => {
        this.statusResponse = true
        this.clear()
        this.messageError = errors.error.message;
     });
  }

  updateClient() {
    this.client.identification = Number(this.client.identification);
    this.clientService.updateClient(this.client).subscribe(
      data => {
        this.statusResponse = false
        this.clear()
        this.getClients()
        this.closebutton1.nativeElement.click();
      },
      errors => {
        this.statusResponse = true
        this.clear()
        this.messageError = errors.error.message;
     });
  }

  clear(){
    this.statusButon = true
    this.isVisible = false
    this.client.identification = 0
    this.client.fullname = ""
    this.client.address = ""
    this.client.mobile = ""
  }

}
