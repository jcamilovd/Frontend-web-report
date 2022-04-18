import { Component, OnInit } from '@angular/core';
//importacion de servicios
import { ClientService } from '../../client.service';
//importacion de clases necesarias para manejar formularios reactivos y el routing
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginComponent } from '../../components/login/login.component'
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-register-shop',
  templateUrl: './register-shop.component.html',
  styleUrls: ['./register-shop.component.css']
})
export class RegisterShopComponent implements OnInit {
  cities!: Array<any>;
  spinner: boolean = false;
  form!: FormGroup;
  hide = true;

  constructor(private client: ClientService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {


  }
  consultCities(){
    this.client.getRequestConsultCities("http://localhost:10101/consultCities").subscribe(
      //cuando la respuesta del server llega es emitida por el observable mediante next()..
      (response: any) => {
        this.cities = response.cities;
        console.log(response);
    },
    //si ocurre un error en el proceso de envío del formulario...
    (error) => {
      console.log(error.status);
      }
    )
  }
}
