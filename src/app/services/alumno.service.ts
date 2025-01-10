import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alumno } from '../models/alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  urlEndPoint = "http://127.0.0.1:8000/api/alumno"
  httpHeaders = new HttpHeaders({"Content-type":"Application/json"})
  constructor(private httpClient: HttpClient) { }

  getAlumno(): Observable<Alumno[]>{
      return this.httpClient.get<Alumno[]>(this.urlEndPoint);
    }
  
  saveAlumno(alumno: Alumno): Observable<Alumno>{
    return this.httpClient.post<Alumno>(this.urlEndPoint, alumno, {headers:this.httpHeaders});
  }
}
