import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-lost',
  templateUrl: './report-lost.component.html',
  styleUrls: ['./report-lost.component.css']
})
export class ReportLostComponent implements OnInit {
  title:string="Reportar documentos perdidos";
  constructor() { }

  ngOnInit(): void {
  }
  
}
