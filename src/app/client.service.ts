import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  getRequestConsultDocumentTypes(route: string) {
    //configuracion del tipo de respuesta esperado
    let config: any = {
      responseType: "json"
    }

    const header = new HttpHeaders().set('Authorization', '57ydf544ljka559ahjkfgd1');
    config["headers"] = header;

    //Notese que como tercer parametro se pasa la configuracion de la request
    return this.http.get(route, config);
  }

  //se inyecta el cliente http de Angular
  constructor(private http: HttpClient) { }

  updateRequestActivation(route: string) {
    let config: any = {
      responseType: "json"
    }

    const header = new HttpHeaders().set('Authorization', '57ydf544ljka559ahjkfgd1');
    config["headers"] = header;

    //Notese que como tercer parametro se pasa la configuracion de la request
    return this.http.put(route, config);
  }

  getRequestConsultCities(route: string) {
    //configuracion del tipo de respuesta esperado
    let config: any = {
      responseType: "json"
    }

    const header = new HttpHeaders().set('Authorization', '57ydf544ljka559ahjkfgd1');
    config["headers"] = header;

    //Notese que como tercer parametro se pasa la configuracion de la request
    return this.http.get(route, config);
  }


  //metodo que recibe como parametro una url un json a ser enviado. Esta solicitud se hace con metodo POST
  //en este caso el json proviene de los datos de un formulario.
  postRequestSendForm(route: string, data: any) {
    let config: any = {
      responseType: "json"
    }

    const header = new HttpHeaders().set('Authorization', '57ydf544ljka559ahjkfgd1');
    config["headers"] = header;
    //Notese que como tercer parametro se pasa la configuracion de la request
    return this.http.post(route, data, config);
  }

  postRequestAddDocuments(route: string, data: any) {
    let config: any = {
      responseType: "json"
    }

    const header = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    config["headers"] = header;
    //Notese que como tercer parametro se pasa la configuracion de la request
    return this.http.post(route, data, config);
  }

  postRequestUploadImage(route: string, data: any) {
    let config: any = {
      responseType: "json"
    }

    const header = new HttpHeaders().set('Authorization', '57ydf544ljka559ahjkfgd1');
    config["headers"] = header;
    //Notese que como tercer parametro se pasa la configuracion de la request
    return this.http.post(route, data, config);
  }

  //metodo que recibe como parametro una url un json a ser enviado. Esta solicitud se hace con metodo POST
  //en este caso el json proviene de los datos de un formulario.
  postRequestLogin(route: string, data: any) {
    let config: any = {
      responseType: "json"
    }

    const header = new HttpHeaders().set('Authorization', '57ydf544ljka559ahjkfgd1');
    config["headers"] = header;
    //Notese que como tercer parametro se pasa la configuracion de la request
    return this.http.post(route, data, config);
  }

  getRequestConsultDocuments(route: string) {
    //configuracion del tipo de respuesta esperado
    let config: any = {
      responseType: "json"
    }

    //configuracion de una cabecera,, en este caso la cabecera se llama Authorization y
    //su valor es el token almacenado e localStorage
    const header = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    config["headers"] = header;
    //se retorna el observable el cual emitira un valor una vez el server haya devuelto 
    //la respuesta, tal valor es la descarga esperada. Recordar que el observador debe
    //suscribirse a este observable para poder tener acceso al valor de descarga
    //esto se puede ver en la linea 83 de ejemplos.component.ts
    //Notese que como segundo parametro se pasa la configuracion de la request
    return this.http.get(route, config);
  }

  getRequestMyConsultDocuments(route: string) {
    //configuracion del tipo de respuesta esperado
    let config: any = {
      responseType: "json"
    }

    //configuracion de una cabecera,, en este caso la cabecera se llama Authorization y
    //su valor es el token almacenado e localStorage
    const header = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    config["headers"] = header;
    //se retorna el observable el cual emitira un valor una vez el server haya devuelto 
    //la respuesta, tal valor es la descarga esperada. Recordar que el observador debe
    //suscribirse a este observable para poder tener acceso al valor de descarga
    //esto se puede ver en la linea 83 de ejemplos.component.ts
    //Notese que como segundo parametro se pasa la configuracion de la request
    return this.http.get(route, config);
  }

  updateRequestUpdateData(route: string, data: any) {
    //configuracion del tipo de respuesta esperado
    let config: any = {
      responseType: "json"
    }
    console.log(localStorage.getItem('token'));

    //configuracion de una cabecera,, en este caso la cabecera se llama Authorization y
    //su valor es el token almacenado e localStorage
    const header = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    config["headers"] = header;
    //se retorna el observable el cual emitira un valor una vez el server haya devuelto 
    //la respuesta, tal valor es la descarga esperada. Recordar que el observador debe
    //suscribirse a este observable para poder tener acceso al valor de descarga
    //esto se puede ver en la linea 83 de ejemplos.component.ts
    //Notese que como segundo parametro se pasa la configuracion de la request

    return this.http.put(route, data, config);
  }

  getRequestData(route: string) {
    //configuracion del tipo de respuesta esperado
    let config: any = {
      responseType: "json"
    }
    console.log(localStorage.getItem('token'));

    //configuracion de una cabecera,, en este caso la cabecera se llama Authorization y
    //su valor es el token almacenado e localStorage
    const header = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    config["headers"] = header;
    //se retorna el observable el cual emitira un valor una vez el server haya devuelto 
    //la respuesta, tal valor es la descarga esperada. Recordar que el observador debe
    //suscribirse a este observable para poder tener acceso al valor de descarga
    //esto se puede ver en la linea 83 de ejemplos.component.ts
    //Notese que como segundo parametro se pasa la configuracion de la request

    return this.http.get(route, config);
  }

  getRequestConsultDocument(route: string) {
    //configuracion del tipo de respuesta esperado
    let config: any = {
      responseType: "json"
    }

    const header = new HttpHeaders().set('Authorization', '57ydf544ljka559ahjkfgd1');
    config["headers"] = header;

    //Notese que como tercer parametro se pasa la configuracion de la request
    return this.http.get(route, config);
  }

  putRequestUpdateDocument(route: string, data: any) {
    //configuracion del tipo de respuesta esperado
    let config: any = {
      responseType: "json"
    }
  
    const header = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    config["headers"] = header;
  
    return this.http.put(route, data, config);
  }

  deleteRequestDeleteDocument(route: string) {
    //configuracion del tipo de respuesta esperado
    let config: any = {
      responseType: "json"
    }

    const header = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    config["headers"] = header;

    //Notese que como tercer parametro se pasa la configuracion de la request
    return this.http.delete(route, config);
  }
}