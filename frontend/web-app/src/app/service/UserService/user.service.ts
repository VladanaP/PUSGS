import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { path } from '../../../environments/environment';
import { catchError, map, Observable, of } from 'rxjs';
import { User } from 'src/app/model/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  getById(id: number){
    return this._http.get(`${path}/api/user/${id}`, {observe : 'response'})
  }

  update(user: User){
    return this._http.put(`${path}/api/user`, user, {observe : 'response'})
  }
}
