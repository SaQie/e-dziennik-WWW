import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthData } from '../authorization/model/AuthData';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private http: HttpClient) {

  }

  login(authData: AuthData) {
    return this.http.post(`${environment.loginAddress}/login`, authData);
  }

  setRole(role: string[]) {
    window.sessionStorage.setItem("roles", JSON.stringify(role));
  };

  setId(id : string){
    window.sessionStorage.setItem("id", id);
  }

  setSuperId(id:string){
    window.sessionStorage.setItem("superId", id);
  }

  getId(){
    return sessionStorage.getItem("id");
  }

  getRole() {
    return sessionStorage.getItem("roles");
  }

  getSuperId(){
    return sessionStorage.getItem("superId");
  }

  setToken(token:string){
    window.sessionStorage.setItem("token", token);
  }

  getToken(){
    return sessionStorage.getItem("token");
  }

  setRefreshToken(token:string){
    window.sessionStorage.setItem("refreshToken", token);
  }

  getRefreshToken(){
    return sessionStorage.getItem("refreshToken");
  }

  setUserData(decodedToken:any){
    this.setId(decodedToken.id);
    this.setSuperId(decodedToken.superId);
    this.setRole(decodedToken.roles);
  }


  clear(){
    window.sessionStorage.clear();
  }

  isLoggedIn(){
    return this.getRole() && this.getToken();
  }

  


}
