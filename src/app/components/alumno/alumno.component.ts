import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlumnoService } from '../../services/alumno.service';
import { GradoGrupoTurno } from '../../models/grado-grupo-turno';
import { MateriaService } from '../../services/materia.service';
import { Materia } from '../../models/materia';
import { UtilsService } from '../../services/utils.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrl: './alumno.component.css'
})
export class AlumnoComponent implements OnInit{
  ggt: GradoGrupoTurno = {
    grado: '',
    grupo: '',
    turno: '',
    id: 0
  };

  grados: string[] = []
  grupos: string[] = []
  turnos: string[] = []
    
  materia: Materia[] = [];

  constructor(private formBuilder: FormBuilder,
    private alumnoService: AlumnoService,
    private materiaService: MateriaService,
    private utilsService: UtilsService
  ){}

  ngOnInit(): void {
    this.turnos.push("matutino", "vespertino")
    this.materiaService.getMaterias().subscribe(materia => {
      this.materia = materia
      this.materia.forEach(materia =>{
        this.grados.push(materia.grado)
        this.grupos.push(materia.grupo)
      })
      this.grados = this.utilsService.unicosArray(this.grados)
      this.grupos = this.utilsService.unicosArray(this.grupos)
    });
  }

  alumnoForm: FormGroup = this.formBuilder.group({
    nombres: ["", Validators.required],
    apellidos: ["", Validators.required],
    edad: ["", Validators.required],
    grado: ["", Validators.required],
    grupo: ["", Validators.required],
    turno: ["", Validators.required],
  })

  guardar(){
    console.log(this.alumnoForm.value)
      this.alumnoService.saveAlumno(this.alumnoForm.value).subscribe({
            next: (alumno) => {
              this.alertaSuccess();
            },
            error: (e) => Swal.fire({
              icon: "error",
              title: "Problema al guardar alumno "+e,
              text: "Hubo algun problema al guardar alumno",
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
}
