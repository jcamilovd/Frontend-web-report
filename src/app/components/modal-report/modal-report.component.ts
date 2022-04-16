import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ClientService } from '../../client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-report',
  templateUrl: './modal-report.component.html',
  styleUrls: ['./modal-report.component.css']
})
export class ModalReportComponent implements OnInit {
  private image: any;
  private imageOriginal: any;

  spinner: boolean = false;
  element = this.data.content;
  form!: FormGroup;
  cities!: Array<any>;
  documentType!: Array<any>;

  constructor(private client: ClientService, private fb: FormBuilder, public dialog: MatDialogRef<ModalReportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.consultCities();
    this.consultDocumentsTypes();
    this.form = this.fb.group({
      documentNumber: ['', [Validators.required, Validators.min(10000000), Validators.max(9999999999)]],
      fullName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      cityCode: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(6)]],
      description: ['', Validators.maxLength(1000)]
    });

    this.initValuesForm();
  }

  consultCities() {
    this.client.getRequestConsultCities("http://localhost:10101/consultCities").subscribe(
      //cuando la respuesta del server llega es emitida por el observable mediante next()..
      (response: any) => {
        this.cities = response.cities;
      },
      //si ocurre un error en el proceso de envío del formulario...
      (error) => {
        console.log(error.status);
      }
    )
  }

  consultDocumentsTypes() {
    this.client.getRequestConsultDocumentTypes("http://localhost:10101/consultDocumentType").subscribe(
      //cuando la respuesta del server llega es emitida por el observable mediante next()..
      (response: any) => {
        this.documentType = response.documentType;
      },
      //si ocurre un error en el proceso de envío del formulario...
      (error) => {
        console.log(error.status);
      }
    )
  }

  private initValuesForm(): void {
    this.form.patchValue({
      documentNumber: this.element.documentNumber,
      fullName: this.element.fullName,
      email: this.element.email,
      cityCode: this.element.cityCode,
      description: this.element.description
    });
  }

  cancelModify() {
    this.dialog.close(true);
  }

  onSubmit() {
    Swal.fire({
      icon: 'question',
      title: '¿Desea guardar los cambios?',
      showCancelButton: true,
      cancelButtonText: `Cancelar`,
      showConfirmButton: true,
      confirmButtonText: `Guardar`,
      confirmButtonColor: '#488D95'
    }).then((result) => {
      if (result.isConfirmed) {
        //si la validacion del formulario es exitosa...
        if (this.form.valid) {
          this.spinner = true;
          //se envian los datos del formulario mediante una solicitud POST, los valores de los inputs del formulario 
          //se recogen usando los controles "email" y "password" para formar el json a enviar..
          this.client.putRequestUpdateDocument('http://localhost:10101/updateDocument', {
            id: this.element.id,
            documentNumber: this.form.value.documentNumber,
            fullName: this.form.value.fullName,
            email: this.form.value.email,
            description: this.form.value.description,
            cityCode: this.form.value.cityCode,
          }).subscribe(
            //cuando la respuesta del server llega es emitida por el observable mediante next()..
            (response: any) => {
              this.spinner = false;
              //se imprime la respuesta del server
              console.log(response);
              this.element.documentNumber = this.form.value.documentNumber;
              this.element.fullName = this.form.value.fullName;
              this.element.email = this.form.value.email;
              this.element.description = this.form.value.description;
              this.element.cityCode = this.form.value.cityCode;
              for (const iterator of this.cities) {
                if (iterator.code === this.element.cityCode) {
                  this.element.cityName = iterator.name;
                  break;
                }
              }
              this.dialog.close(true);
              Swal.fire({
                icon: 'success',
                title: 'Reporte modificado con exito',
                background: '#fff',
                confirmButtonColor: '#045b62'
              });
            },
            //si ocurre un error en el proceso de envío del formulario...
            (error) => {
              Swal.fire({
                icon: 'warning',
                title: 'Problemas en el servidor',
                text: 'En estos momentos tenemos fallas en el sistema ' + error.status,
                background: '#fff',
                confirmButtonColor: '#045b62'
              });
              //se imprime el status del error
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
    })
  }

}
