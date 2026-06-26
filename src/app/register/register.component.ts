import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';





@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  isLoading: boolean = false;

  errMessage!: string;

  constructor(private _AuthService: AuthService , private _Router:Router ) { }

  registerForm: FormGroup = new FormGroup({

    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, ]),
    rePassword: new FormControl(null, [Validators.required,]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^(01)[0125][0-9]{8}$/)]),

  }, this.confirmPassword)


  registerSubmitMethod() {

    this.isLoading = true;


    this._AuthService.registerAPI(this.registerForm.value).subscribe({
      next: (res) => {

        this.isLoading = false;
         this._Router.navigate(['/login'])

      },
      error: (err:HttpErrorResponse) => {
        this.errMessage = err.error.message ;
        this.isLoading = false;
      
    
        
      }
    })
  }
  
  

  confirmPassword(g: any) {
    if (g.get('password')?.value == g.get('rePassword')?.value) {
      return null;
    } else {
      return { "matchedPassword": true }
    }
  }










}

