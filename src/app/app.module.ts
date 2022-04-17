import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routin.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormReportComponent } from './components/form-report/form-report.component';
import { ReportLostComponent } from './pages/report-lost/report-lost.component';
import { ReportFoundComponent } from './pages/report-found/report-found.component';
import { TableReportComponent } from './components/table-report/table-report.component';
import { ConsultLostComponent } from './pages/consult-lost/consult-lost.component';
import { ConsultFoundComponent } from './pages/consult-found/consult-found.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ActivationComponent } from './pages/activation/activation.component';
import { UpdateDataComponent } from './pages/update-data/update-data.component';
import { ModalReportComponent } from './components/modal-report/modal-report.component';
import { RegisterShopComponent } from './pages/register-shop/register-shop.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    FormReportComponent,
    ReportLostComponent,
    ReportFoundComponent,
    TableReportComponent,
    ConsultLostComponent,
    ConsultFoundComponent,
    RegisterComponent,
    LoginComponent,
    ActivationComponent,
    UpdateDataComponent,
    ModalReportComponent,
    RegisterShopComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents:[ModalReportComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
