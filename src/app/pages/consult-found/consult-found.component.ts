import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../../client.service';
import { LoginComponent } from '../../components/login/login.component'
import { MatDialog } from '@angular/material/dialog';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-consult-found',
  templateUrl: './consult-found.component.html',
  styleUrls: ['./consult-found.component.css']
})
export class ConsultFoundComponent implements OnInit {
  documents!:Array<any>;

  constructor(private client:ClientService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.uploadDocument();
  }

  uploadDocument(){
    if (this.router.url == '/consultFound') {
    this.client.getRequestConsultDocuments("http://localhost:10101/consultDocuments/?category=0").subscribe(
      //cuando la respuesta del server llega es emitida por el observable mediante next()..
      (response: any) => {
        this.documents = response.documents;
        console.log(response);
    },
    //si ocurre un error en el proceso de envío del formulario...
    (error) => {
      localStorage.removeItem('token');
      this.router.navigate( ['/']);
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
    }else if (this.router.url == '/myConsultDocumentsFound') {
      this.client.getRequestMyConsultDocuments("http://localhost:10101/myConsultDocumentsFound/?category=0").subscribe(
        //cuando la respuesta del server llega es emitida por el observable mediante next()..
        (response: any) => {
          this.documents = response.documents;
          console.log(response);
        },
        //si ocurre un error en el proceso de envío del formulario...
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
  }

}
