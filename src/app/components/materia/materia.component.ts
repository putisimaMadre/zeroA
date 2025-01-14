import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MateriaService } from '../../services/materia.service';
import Swal from 'sweetalert2'
import { GradoGrupoTurno } from '../../models/grado-grupo-turno';
import { AlumnoService } from '../../services/alumno.service';
import { Alumno } from '../../models/alumno';

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrl: './materia.component.css'
})
export class MateriaComponent implements OnInit{
  concatenado: string = "";
  alumno: Alumno [] = [];
  turnos: string[] = []
  
  ggt: GradoGrupoTurno = {
      id: 0,
      grado: '',
      grupo: '',
      turno: ''
    };

  constructor(private formBuilder: FormBuilder,
    private materiaService: MateriaService,
    private alumnoService: AlumnoService
  ){}
  
  ngOnInit(): void {
    this.turnos.push("matutino", "vespertino")
  }

  materiaForm: FormGroup = this.formBuilder.group({
    nombre: ["", Validators.required],
    grado: ["", Validators.required],
    grupo: ["", Validators.required],
    turno: ["", Validators.required],
    concatenado: [""]
  })

  guardar(){
    this.concatenarDatos();
    this.materiaService.saveMateria(this.materiaForm.value).subscribe({
      next: (materia) => {
        this.alertaSuccess();
        },    
      error: (e) => Swal.fire({
        icon: "error",
        title: "Datos duplicados",
        text: "La materia '" + this.materiaForm.get("nombre")?.value + 
               "' con el grado '" + this.materiaForm.get("grado")?.value + 
               "' con el grupo '" + this.materiaForm.get("grupo")?.value + 
               "' y el turno '" + this.materiaForm.get("turno")?.value + 
               "' ya existe!",
        footer: 'No se logro guardar la informacion'
      }),
      complete: () => console.info('complete')
    })
  }

  alertaSuccess():void{
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Alumno agregado correctamente",
        showConfirmButton: false,
        timer: 1500
        })
    }

    concatenarDatos(): void{
      this.concatenado = this.materiaForm.get("nombre")?.value + 
      this.materiaForm.get("grado")?.value + 
      this.materiaForm.get("grupo")?.value + 
      this.materiaForm.get("turno")?.value;
      this.materiaForm.controls["concatenado"].setValue(this.concatenado)
    }
}
