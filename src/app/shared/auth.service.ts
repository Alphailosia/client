import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'http://localhost:8010/api/'//'https://angular-intense-app.herokuapp.com/api/';
  auth = false;
  admin = false

  register(name:String, email: String, password: String): Observable<any> {
    return  this.httpClient.post<any>(this.url+'register',{params:{'name':name, 'password':password,'email':email}})
  }

  logIn(email: String, password: String): Observable<any> {
    return  this.httpClient.post<any>(this.url+'login',{params:{'email':email, 'password':password}})
  }

  logOut():  Observable<any> {
    return  this.httpClient.get<any>(this.url+'logout')
  }

  isAdmin(){
    let isUserAdmin = new Promise((resolve, reject) => {
      resolve(this.admin);
    })

    return isUserAdmin;
  }

  checkAdmin(password:string):Observable<any>{
    return this.httpClient.get<any>(this.url+'admin',{params:{'password':password}})
  }

  constructor(private httpClient:HttpClient) { }
}
