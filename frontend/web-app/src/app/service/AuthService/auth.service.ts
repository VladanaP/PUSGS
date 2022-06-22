import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { Login } from 'src/app/model/login';
import { path } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private _http: HttpClient) { }
  private _accessToken = "";

  login(username: string, password: string): Observable<any> {
    const body = {
      'username': username,
      'password': password
    };
    return this._http.post(`${path}/api/user/authenticate`, body, {observe : 'response'})
    .pipe(map((res: any) => {
      if (res) {
        this._accessToken = res.body.token;
        let user = {
          username: res.body.username,
          id: res.body.id,
          role: res.body.role
        }
        localStorage.setItem("jwt", this._accessToken);
        localStorage.setItem("currentUser", JSON.stringify(user));
        this.router.navigate([`${user.role}/profile`]);
      }}), catchError((err, caught) => {
      alert("Wrong credentials")
      return of(void(0))
    }))
  }
}
