import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/Clients/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  listClient: Client[] = []
  client: Client = {identification :0, fullname : "", address : "", mobile : ""}

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
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

}
