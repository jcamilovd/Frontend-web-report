import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../../client.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../../components/login/login.component'

import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-data',
  templateUrl: './update-data.component.html',
  styleUrls: ['./update-data.component.css']
})
export class UpdateDataComponent implements OnInit {

  spinner: boolean = false;
  form!: FormGroup;
  cities!: Array<any>;
  inputFormControl = new FormControl({ value: null, disabled: false });
  edit = false;
  updade = true;
  fullName!: string;
  email!: string;
  cityCode!: string;
  identificationNumberUser!: number;
  inputFormControlCedula = new FormControl({ value: null, disabled: true });

  constructor(private client: ClientService, private fb: FormBuilder, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.inputFormControl.disable();
    //creamos nuestro formulario  tan pronto cargue nuestro componente a partir de los controles que en el HTML llamamos "cedula" y "nombre", etc
    //estos controles se encuentran en cada input del formulario formControlName="cedula" y formControlName="password" 
    //se configuran los valores iniciales de cada input y las validaciones correspondientes
    this.form = this.fb.group({
      identificationNumber: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10)]],
      fullName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      cityCode: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(6)]],
    });
    this.consultCities();
    this.showData()
  }
  cancel() {
    this.inputFormControl.disable();
    this.edit = false;
    this.updade = true;

    this.form.controls.fullName.setValue(this.fullName);
    this.form.controls.email.setValue(this.email);
    this.form.controls.cityCode.setValue(this.cityCode);
  }

  consultCities() {
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
  onEnable() {
    this.inputFormControl.enable();
    this.edit = true;
    this.updade = false;

  }
  showData() {
    this.client.getRequestData("http://localhost:10101/consultUser").subscribe(
      //cuando la respuesta del server llega es emitida por el observable mediante next()..
      (response: any) => {
        this.identificationNumberUser = response.user.identificationNumber
        this.fullName = response.user.fullName
        this.email = response.user.email
        this.cityCode = response.user.cityCode

        this.form.controls.identificationNumber.setValue(response.user.identificationNumber);
        this.form.controls.fullName.setValue(response.user.fullName);
        this.form.controls.email.setValue(response.user.email);
        this.form.controls.cityCode.setValue(response.user.cityCode);
      },
      (error) => {
        localStorage.removeItem('token');
        this.router.navigate(['/']);
        this.dialog.open(LoginComponent);
        Swal.fire({
          icon: 'warning',
          title: 'Página no permitida',
          text: 'Por favor inicie sesión',
          background: '#fff',
          confirmButtonColor: '#045b62'
        });
        //se imprime el status del error
        console.log(error.status);
      }
    )
  }

  onSubmit() {
    //si la validacion del formulario es exitosa...
    Swal.fire({
      icon: 'question',
      title: '¿Desea guardar los cambios?',
      showCancelButton: true,
      cancelButtonText: `Cancelar`,
      showConfirmButton: true,
      confirmButtonText: `Guardar`,
      confirmButtonColor: '#488D95'
    }).then((result) => {
      //Read more about isConfirmed, isDenied below
      if (result.isConfirmed) {
        if (this.form.valid) {
          this.spinner = true;
          //se envian los datos del formulario mediante una solicitud POST, los valores de los inputs del formulario 
          //se recogen usando los controles "email" y "password" para formar el json a enviar..
          this.client.updateRequestUpdateData('http://localhost:10101/updateData', {
            identificationNumber: this.identificationNumberUser,
            fullName: this.form.value.fullName,
            email: this.form.value.email,
            cityCode: this.form.value.cityCode,
          }).subscribe(
            //cuando la respuesta del server llega es emitida por el observable mediante next()..
            (response: any) => {
              //se imprime la respuesta del server
              this.fullName = this.form.value.fullName
              this.email = this.form.value.email
              this.cityCode = this.form.value.cityCode
              this.inputFormControl.disable();
              this.edit = false;
              this.updade = true;

              this.spinner = false;
            },
            //si ocurre un error en el proceso de envío del formulario...
            (error) => {
              //se imprime el status del error
              Swal.fire({
                icon: 'warning',
                title: 'Problemas en el servidor',
                text: 'En estos momentos tenemos fallas en el sistema ' + error.status,
                background: '#fff',
                confirmButtonColor: '#045b62'
              });
              console.log(error.status);
            })
          //si ocurrio un error en la validacion del formulario este no se enviara
          //y se imprimira el mensaje "Form error"
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'Datos invalidos',
            text: 'Por favor diligencie los datos correctamente',
            background: '#fff',
            confirmButtonColor: '#045b62'
          });
          console.log("Form error");
        }

      } else if (result.isDenied) {
        Swal.fire('Los cambios no han sido guardados', '', 'info')
      }
    });
  }
}