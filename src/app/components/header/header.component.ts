import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import {MatDialog} from '@angular/material/dialog';
import {SecurityService} from '../../services/security.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  login:boolean = localStorage.getItem('token')?true:false;
  boton1=false;
  boton2=false;
  boton3=false;

  constructor(private router: Router, private dialog: MatDialog, private security:SecurityService) { }

  ngOnInit(): void {
    this.verifyLogin();
  }

  verifyLogin(){
    this.security.verifyLogin().subscribe(
      (response) => this.login = response, (err) => console.log(err)
    );
  }

  showHome(){
    this.router.navigate(['/']);
    this.boton1=false;
    this.boton2=false;
    this.boton1=false;
  }

  showReportLost(){
    this.router.navigate(['/reportLost']);
    this.boton1=true;
    this.boton2=false;
    this.boton3=false;
  }

  showReportFound(){
    this.router.navigate(['/reportFound']);
    this.boton1=false;
    this.boton2=true;
    this.boton3=false;
  }

  showLogin(){
    const dialogRef = this.dialog.open(LoginComponent);
  }

  showDocumentsLost(){
    this.router.navigate(['/consultLost']);
  }

  showMyDocumentsLost(){
    this.router.navigate(['/myConsultDocuments']);
  }

  showMyDocumentsFound(){
    this.router.navigate(['/myConsultDocumentsFound']);
  }

  showDocumentsFound(){
    this.router.navigate(['/consultFound']);
  }

  showUpdateData(){
    this.router.navigate(['/updateData']);
  }

  showSignOff(){
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}