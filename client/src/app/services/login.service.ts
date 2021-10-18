import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loggedInStatus = JSON.parse(localStorage.getItem('isLoggedIn') || 'false');
  env = environment;
  private url =  this.env.apiUrl + 'Authenticate';
  constructor(private http: HttpClient) { }

  get isLoggedIn() {
      return JSON.parse(localStorage.getItem('isLoggedIn') || this.loggedInStatus.toString());
  }

  validateUser(loginUser: any): Observable<any> {
    return this.http.post<any>(this.url, loginUser, {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    });
  }
}
