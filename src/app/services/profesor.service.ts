import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profesor } from '../models/profesor';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {
urlEndPoint = "http://127.0.0.1:8000/api/profesor"
httpHeaders = new HttpHeaders({"Content-type": "Application/json"})
  constructor(private httpClient: HttpClient) { }

  getProfesor(): Observable<Profesor[]>{
    return this.httpClient.get<Profesor[]>(this.urlEndPoint);
  }

  saveProfesor(profesor: Profesor): Observable<Profesor>{
    return this.httpClient.post<Profesor>(this.urlEndPoint, profesor, {headers: this.httpHeaders})
  }
}
