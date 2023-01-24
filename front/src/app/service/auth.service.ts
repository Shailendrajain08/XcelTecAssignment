import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signUp(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/auth/signup', data)
  }

  signIn(data: any): Observable<any> {

    return this.http.post('http://localhost:3000/auth/login', data)
  }
  getProfile(): Observable<any> {
    let headers = {
      'Authorization': "Bearer" + localStorage.getItem('token')
    }
    return this.http.get('http://localhost:3000/auth/home', {headers:headers})
  }
}
