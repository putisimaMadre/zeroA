import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Alumno } from '../models/alumno';
import { GradoGrupoTurno } from '../models/grado-grupo-turno';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  urlEndPoint = "http://127.0.0.1:8000/api/alumno"
  urlEndPointAbyGGT = "http://127.0.0.1:8000/api/alumnoBybusquedaGradoGrupoTurno"
  httpHeaders = new HttpHeaders({"Content-type":"Application/json"})
  
  private _refreshrequired = new Subject<void>();
  get RequiredRefresh(){
    return this._refreshrequired;
  }
  
  constructor(private httpClient: HttpClient) { }

  getAlumno(): Observable<Alumno[]>{
      return this.httpClient.get<Alumno[]>(this.urlEndPoint);
    }

  getAlumnoById(idAlumno: number): Observable<Alumno>{
    return this.httpClient.get<Alumno>(this.urlEndPoint+'/'+idAlumno);
  }
  
  saveAlumno(alumno: Alumno): Observable<Alumno>{
    return this.httpClient.post<Alumno>(this.urlEndPoint, alumno, {headers:this.httpHeaders});
  }

  alumnoBybusquedaGradoGrupoTurno(ggt: GradoGrupoTurno): Observable<Alumno[]>{
    return this.httpClient.post<Alumno[]>(this.urlEndPointAbyGGT, ggt, {headers:this.httpHeaders});
  }
}
