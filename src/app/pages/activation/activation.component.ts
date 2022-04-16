import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../../client.service';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.css']
})
export class ActivationComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private client: ClientService) { }

  ngOnInit(): void {
    this.activation();

    // console.log(this.activatedRoute.snapshot.queryParams.id);
  }

  activation() {
    this.activatedRoute.snapshot.queryParams.id
    this.client.updateRequestActivation(`http://localhost:10101/activation/?identificationNumber=${this.activatedRoute.snapshot.queryParams.identificationNumber}`).subscribe(
      //cuando la respuesta del server llega es emitida por el observable mediante next()..
      (response: any) => {
        console.log(response);
      },
      //si ocurre un error en el proceso de envío del formulario...
      (error) => {
        //se imprime el status del error
        console.log(error.status);
      }
    )
  }
}
