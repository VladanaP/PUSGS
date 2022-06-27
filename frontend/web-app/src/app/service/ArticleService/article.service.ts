import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from 'src/app/model/article';
import { path } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private _http: HttpClient) { }

  getById(id: number){
    return this._http.get(`${path}/api/article/${id}`, {observe : 'response'})
  }

  save(article: Article){
    return this._http.post(`${path}/api/article`, article, {observe : 'response'})
  }

  getAll(): Observable<HttpResponse<any>> {
    return this._http.get(`${path}/api/article`, {observe : 'response'})
  }

}
