import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const USER_INFO_API_URL ='https://localhost:5001/api/UserInfo/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http : HttpClient) { }

  getUserList() : Observable<any>{
    return this._http.get(USER_INFO_API_URL);
  }

  addNewUser(userData: any) : Observable<any>{
    return this._http.post(USER_INFO_API_URL,userData);
  }

  updateExistingUser(userId: number, userData: any) : Observable<any>{
    return this._http.put(`${USER_INFO_API_URL}${userId}`,userData);
  }

  deleteUser(userId: number) : Observable<any>{
    return this._http.delete(`${USER_INFO_API_URL}${userId}`);
  }

}
