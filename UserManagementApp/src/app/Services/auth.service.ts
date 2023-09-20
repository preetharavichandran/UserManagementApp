import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from '../Models/loginRequest';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginURL = "https://localhost:5001/api/Auth/login"
  constructor(private _http: HttpClient, private _router: Router) { }

  public login(loginRequest: LoginRequest): Observable<string> {
    return this._http.post(this.loginURL,loginRequest,{responseType:'text'});
  }

  public logout(){
    localStorage.removeItem('authToken');
    this._router.navigate(['/login']);
  }

  isLoggedIn() {
    const token = localStorage.getItem('authToken'); // get token from local storage
    if(token!=null)
    {
      const payload = atob(token.split('.')[1]); // decode payload of token
    const parsedPayload = JSON.parse(payload); // convert payload into an Object

    return parsedPayload.exp > Date.now() / 1000; // check if token is expired
    }

    return false;
  }

}
