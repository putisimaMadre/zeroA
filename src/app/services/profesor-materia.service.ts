import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProfesorMateria } from '../models/profesorMateria';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfesorMateriaService {
urlEndPoint = "http://127.0.0.1:8000/api/profesorMateria"
httpHeaders = new HttpHeaders({"Content-type":"Application/json"})
  constructor(private httpClient: HttpClient) { }

  getProfesorMateria(): Observable<ProfesorMateria[]>{
    return this.httpClient.get<ProfesorMateria[]>(this.urlEndPoint)
  }

  saveProfesorMateria(profesorMateria: ProfesorMateria): Observable<ProfesorMateria>{
    return this.httpClient.post<ProfesorMateria>(this.urlEndPoint, profesorMateria, {headers: this.httpHeaders})
  }
}
