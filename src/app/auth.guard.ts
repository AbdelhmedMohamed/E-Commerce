import { CanActivateFn,Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';



export const authGuard: CanActivateFn = (route, state) => {

let _AuthService:AuthService =inject(AuthService) ;

let _Router:Router = inject(Router) ;

  if(localStorage.getItem("usertoken") == null){
    _Router.navigate(['/login']) ;
    return false ;

  }else{
    _AuthService.saveDataMethod()
    return true ;
  }


};
