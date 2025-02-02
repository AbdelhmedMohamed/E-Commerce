import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';


interface accoutDataInretface {
  name?: string,
  email: string,
  password: string,
  rePassword?: string,
  phone?: string,
  resetCode?:string , 
  newPassword?:string ,
}


@Injectable({
  providedIn: 'root' 
})
export class AuthService {

  userDataVar:BehaviorSubject<any> = new BehaviorSubject(null) ;

  baseURL: string = "https://ecommerce.routemisr.com";

  

  constructor(private _HttpClient: HttpClient , private _Router:Router) {
    
   

    
    //localStorage.setItem("usertoken", "aaa");

    if (localStorage.getItem("usertoken") == null) {

      localStorage.setItem("usertoken", " ");
      
    }else{
      localStorage.getItem("usertoken")
    }

       //if( localStorage.getItem("carrentpage") ){
        // _Router.navigate( [localStorage.getItem("carrentpage") ])
      // }


   }


  registerAPI(rData: accoutDataInretface): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}/api/v1/auth/signup`, rData)
  }


  loginAPI(rData: accoutDataInretface): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}/api/v1/auth/signin`, rData)
  }


// =============================================================

  forgetAPI(rData: accoutDataInretface): Observable<any> {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, rData)
  }

  verifyAPI(rData: accoutDataInretface): Observable<any> {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, rData)
  }
  newPassAPI(rData: accoutDataInretface): Observable<any> {
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, rData)
  }







  saveDataMethod() {
    if (localStorage.getItem("usertoken") != null) {
      this.userDataVar.next(localStorage.getItem("usertoken"));
      this.userDataVar.next(jwtDecode(this.userDataVar.getValue()));
    }else{
      this.userDataVar.next(null) ;
    }

  }




}
