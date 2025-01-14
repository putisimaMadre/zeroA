import { Component, OnInit } from '@angular/core';
import { AlumnoService } from '../../services/alumno.service';
import { Alumno } from '../../models/alumno';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-alumno-list',
  templateUrl: './alumno-list.component.html',
  styleUrl: './alumno-list.component.css'
})
export class AlumnoListComponent implements OnInit{
  alumnos: Alumno[] = []
  displayedColumns: string[] = [
    'nombre',
    'apellido', 
    'edad',
    'grado',
    'grupo',
    'turno'
  ];
  dataSource: any;
  constructor(private alumnoService: AlumnoService){}
  
  ngOnInit(): void {
    this.getAlumnos();
    this.alumnoService.RequiredRefresh.subscribe(() => {
      this.getAlumnos()
    });
  }

  getAlumnos(){
    this.alumnoService.getAlumno().subscribe(alumno => {
      this.alumnos = alumno
      this.dataSource = new MatTableDataSource(this.alumnos);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
