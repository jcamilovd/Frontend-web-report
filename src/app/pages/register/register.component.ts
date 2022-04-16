import { Component, OnInit } from '@angular/core';
//importacion de servicios
import { ClientService } from '../../client.service';
//importacion de clases necesarias para manejar formularios reactivos y el routing
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginComponent } from '../../components/login/login.component'
import { MatDialog } from '@angular/material/dialog';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide = true;
  spinner: boolean = false;
  cities!: Array<any>;
  //grupo de controles de nuestro formulario
  form!: FormGroup;

  //inyeccion de dependencias
  constructor(private client: ClientService, private fb: FormBuilder, private router: Router, private dialog: MatDialog) { }

  //en ngOnInit() metemos todas las instrucciones que queremos que se ejecuten apenas se cree nuestro componente
  ngOnInit(): void {
    this.consultCities();
    
    //creamos nuestro formulario  tan pronto cargue nuestro componente a partir de los controles que en el HTML llamamos "cedula" y "nombre", etc
    //estos controles se encuentran en cada input del formulario formControlName="cedula" y formControlName="password" 
    //se configuran los valores iniciales de cada input y las validaciones correspondientes
    this.form = this.fb.group({
      identificationNumber: ['', [Validators.required, Validators.min(10000000), Validators.max(9999999999)]],
      fullName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      cityCode: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(6)]],
    });
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

  //metodo que se llama para enviar el formulario cuando ocurre el evento (ngSubmit) 
  //que se encuentra referenciado en el form del HTML
  onSubmit() {
    //si la validacion del formulario es exitosa...
    if (this.form.valid) {
      this.spinner = true;
      //se envian los datos del formulario mediante una solicitud POST, los valores de los inputs del formulario 
      //se recogen usando los controles "email" y "password" para formar el json a enviar..
      this.client.postRequestSendForm('http://localhost:10101/registerUser', {
        identificationNumber: this.form.value.identificationNumber,
        fullName: this.form.value.fullName,
        email: this.form.value.email,
        password: this.form.value.password,
        cityCode: this.form.value.cityCode,
        state:false
      }).subscribe(
        //cuando la respuesta del server llega es emitida por el observable mediante next()..
        (response: any) => {
          //se imprime la respuesta del server
          console.log(response);
          this.spinner = false;
          this.router.navigate(['/']);
          this.dialog.open(LoginComponent);
          Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
            text: 'Por favor verifique su correo eléctronico, para validar la cuenta',
            background: '#fff',
            confirmButtonColor: '#045b62'
          });
        },
        //si ocurre un error en el proceso de envío del formulario...
        (error) => {
          //se imprime el status del error
          console.log(error.status);
        })
      //si ocurrio un error en la validacion del formulario este no se enviara
      //y se imprimira el mensaje "Form error"
    } else {
      console.log("Form error");
    }
  }
}