import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Token } from '@angular/compiler';

@Injectable()
export class AddheaderInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

      if(localStorage.getItem('usertoken') != null){
        let myHeaders:any = {Token: localStorage.getItem("usertoken") };

        request = request.clone({
          setHeaders : myHeaders ,
        })
      }
      
        return next.handle(request);

    //   let usertoken :any = localStorage.getItem("usertoken")
    //   let hamada = request.clone({
    //     headers : request.headers.set("token" ,usertoken )
    //     })
      
    // return next.handle(hamada);
  }
}
