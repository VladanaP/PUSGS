import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { User } from 'src/app/model/user';
import { path } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private router: Router, private _http: HttpClient) { }

  register(user: any): Observable<HttpResponse<Object>> {
    return this._http.post(`${path}/api/user`, user, {observe : 'response'})
  }

}
