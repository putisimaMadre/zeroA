import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Materia } from '../models/materia';
import { Alumno } from '../models/alumno';
import { GradoGrupoTurno } from '../models/grado-grupo-turno';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {
urlEndPoint = "http://127.0.0.1:8000/api/materia"
urlEndPointGGT = "http://127.0.0.1:8000/api/busquedaGradoGrupoTurno"
httpHeaders = new HttpHeaders({"Content-type":"Application/json"})
  constructor(private httpClient: HttpClient) { }

  getMaterias(): Observable<Materia[]>{
    return this.httpClient.get<Materia[]>(this.urlEndPoint);
  }

  saveMateria(materia: Materia): Observable<Materia>{
    return this.httpClient.post<Materia>(this.urlEndPoint, materia, {headers:this.httpHeaders});
  }

  busquedaGradoGrupoTurno(ggt: GradoGrupoTurno): Observable<Materia>{
    return this.httpClient.post<Materia>(this.urlEndPointGGT, ggt, {headers:this.httpHeaders});
  }
}
