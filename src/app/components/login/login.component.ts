import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import { Router } from '@angular/router';
//importacion de servicios
import { ClientService } from '../../client.service';
//importacion de clases necesarias para manejar formularios reactivos y el routing
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  spinner: boolean = false;

  //grupo de controles de nuestro formulario
  form!: FormGroup;

  //inyeccion de dependencias
  constructor(private client:ClientService, private fb:FormBuilder, private router: Router, private dialogRef: MatDialogRef<LoginComponent>) { }

  //en ngOnInit() metemos todas las instrucciones que queremos que se ejecuten apenas se cree nuestro componente
  ngOnInit(): void {
    //creamos nuestro formulario  tan pronto cargue nuestro componente a partir de los controles que en el HTML llamamos "cedula" y "nombre", etc
    //estos controles se encuentran en cada input del formulario formControlName="cedula" y formControlName="password" 
    //se configuran los valores iniciales de cada input y las validaciones correspondientes
    this.form = this.fb.group({
      identificationNumber: ['',  [Validators.required, Validators.min(10000000), Validators.max(9999999999)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]]
    });
  }
  
  showRegister(){
    this.dialogRef.close();
    this.router.navigate(['/register']);
  }

  //metodo que se llama para enviar el formulario cuando ocurre el evento (ngSubmit) 
  //que se encuentra referenciado en el form del HTML
  onSubmit() {
    //si la validacion del formulario es exitosa...
    if (this.form.valid) {
      this.spinner = true;
      //se envian los datos del formulario mediante una solicitud POST, los valores de los inputs del formulario 
      //se recogen usando los controles "email" y "password" para formar el json a enviar..
      this.client.postRequestLogin('http://localhost:10101/login', {
        identificationNumber: this.form.value.identificationNumber,
        password: this.form.value.password
      }).subscribe(
        //cuando la respuesta del server llega es emitida por el observable mediante next()..
        (response: any) => {
          this.spinner = false;
          //se imprime la respuesta del server
          console.log(response);
          //se guarda el valor de la propiedad email en el almacenamiento local persistente
          localStorage.setItem('token', response.token);
          //recuperamos el valor de la porpiedad email guardada anteriormete y la imprimimos
          console.log(localStorage.getItem('token'));
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Bienvenido',
            showConfirmButton: false,
            timer: 1400
          })
          this.router.navigate( ['/']);
          this.dialogRef.close();
      },
      //si ocurre un error en el proceso de envío del formulario...
      (error) => {
        //se imprime el status del error
        console.log(error.status);
      })
    //si ocurrio un error en la validacion del formulario este no se enviara
    //y se imprimira el mensaje "Form error"
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Email o contraseña incorrecta',
        showConfirmButton: false,
        timer: 1000
      })
      console.log("Form error");
    }
  }
}
