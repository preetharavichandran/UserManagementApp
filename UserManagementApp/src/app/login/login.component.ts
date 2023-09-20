import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { CommonService } from '../Common/common.service';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { FlexModule } from '@angular/flex-layout';
import { LoginRequest } from '../Models/loginRequest';
import { Router } from '@angular/router';

@Component({
  standalone:true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports:[
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatCardModule,
    FlexModule,
    FormsModule,
  ]
})
export class LoginComponent implements OnInit{
  loginRequest=new LoginRequest();

  constructor(private _authService: AuthService, private _commonService: CommonService, private _router: Router) { }
  
  ngOnInit() {
  }

  login(loginRequest: LoginRequest){
    this._authService.login(this.loginRequest).subscribe(
      (token) => {
        localStorage.setItem('authToken', token);
        this._router.navigate(['/homepage']);
      },
      err => {
        this._commonService.openSnackBar( err.error, 'Try Again',);
      }
    );
  }
}
