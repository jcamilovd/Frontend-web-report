import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor() { }

  verifyLogin() {
    return new Observable<boolean>(observer => {
      setInterval(
        //cada segundo se llamara a esta funcion flecha
        () => {
          localStorage.getItem('token')?observer.next(true):observer.next(false);
        }, 1000);
    })
  }
}
