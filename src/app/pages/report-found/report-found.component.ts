import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-found',
  templateUrl: './report-found.component.html',
  styleUrls: ['./report-found.component.css']
})
export class ReportFoundComponent implements OnInit {
  title:string="Reportar documentos encontrados";
  constructor() { }

  ngOnInit(): void {
  }
}
