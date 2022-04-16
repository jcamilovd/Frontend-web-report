import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ClientService } from '../../client.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  document!: Array<any>;
  documentNumber = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(10)]);
  showWarning: boolean = false;
  showDocuments: boolean = false;

  constructor(private client: ClientService) { }
  ngOnInit(): void {
  }
  value = 'Clear me';
  mail: string = "hola@gmail.com"

  consultDocument(category: number) {
    if (!this.documentNumber.errors) {
      this.client.getRequestConsultDocument(`http://localhost:10101/consultDocument/?category=${category}&documentNumber=${this.documentNumber.value}`).subscribe(
        //cuando la respuesta del server llega es emitida por el observable mediante next()..
        (response: any) => {
          this.document = response.document;

          if (this.document && this.document.length > 0) {
            this.showDocuments = true;
            console.log(this.document);
          } else {
            this.showDocuments = false;
            this.showWarning = true;
            setTimeout(() => {
              this.showWarning = false;
            }, 2000);
          }
        },
        (error) => {
          //se imprime el status del error
          console.log(error.status);
        }
      )
    } else {
      this.showWarning = true;
      setTimeout(() => {
        this.showWarning = false;
      }, 2000);
    }
  }
}
