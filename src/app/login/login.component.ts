import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  isLoading: boolean = false;

  forgetFlag: boolean = true;
  verifyFlag: boolean = false;
  newPassFlag: boolean = false;

  errMessage!: string;

  constructor(private _AuthService: AuthService, private _Router: Router) { }

  loginForm: FormGroup = new FormGroup({


    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]),


  })



//==================================================

// ===================== 1 ===========================
  forgetForm: FormGroup = new FormGroup({


    email: new FormControl(null, [Validators.required, Validators.email]),

  })
// ===================== 2 ===========================
  verifyForm: FormGroup = new FormGroup({


    resetCode: new FormControl(null, [Validators.required]),

  })
// ===================== 3 ===========================
  NewPassForm: FormGroup = new FormGroup({

    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]), 
   

  })






  loginSubmitMethod() {

    this.isLoading = true;

    this._AuthService.loginAPI(this.loginForm.value).subscribe({

      next: (res) => {

        localStorage.setItem("usertoken", res.token);
        this.isLoading = false;
        if (res.message != null) {

          

          this._AuthService.saveDataMethod();

          this._Router.navigate(['/home'])
        }
      },
      error: (err:HttpErrorResponse) => {

        this.errMessage = err.error.message ;
        this.isLoading = false;
        
      }
    })
  }
  // =========================================================


  forgetSubmitMethod() {

    this.isLoading = true;


    this._AuthService.forgetAPI(this.forgetForm.value).subscribe({

      next: (res) => {

        this.isLoading = false;
        if (res.message) {

          this.forgetFlag = false;
          this.verifyFlag = true;
          
          console.log(res.message);

        }


      },
      error: (err) => {


        this.isLoading = false;
        console.log(err.message);


      }
    })
  }


  verifySubmitMethod() {

    this.isLoading = true;


    this._AuthService.verifyAPI(this.verifyForm.value).subscribe({

      next: (res) => {

      
       

        this.isLoading = false;
        if ( res.status == "Success" ) {

         
          this.verifyFlag = false;
          this.newPassFlag = true;
          
          console.log("verift tammam" );

        }


      },
      error: (err) => {


        this.isLoading = false;
        console.log(err.message);


      }
    })
  }

  newPassSubmitMethod() {

    this.isLoading = true;


    this._AuthService.newPassAPI(this.NewPassForm.value).subscribe({

      next: (res) => {

        this.isLoading = false;
        if ( res.token ) {


          console.log("new pass tammam" );

        }


      },
      error: (err) => {


        this.isLoading = false;
        console.log(err.message);


      }
    })
  }


}
