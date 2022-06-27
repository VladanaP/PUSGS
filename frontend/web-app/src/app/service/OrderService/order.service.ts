import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from 'src/app/model/order';
import { path } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _http: HttpClient) { }

  getById(id: number){
    return this._http.get(`${path}/api/order/${id}`, {observe : 'response'})
  }

  save(order: Order){
    return this._http.post(`${path}/api/order`, order, {observe : 'response'})
  }

  update(order: Order){
    return this._http.put(`${path}/api/order`, order, {observe : 'response'})
  }

  getAll(): any {
    return this._http.get(`${path}/api/order`, {observe : 'response'})
  }

}
