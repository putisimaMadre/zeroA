import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { AlumnoService } from '../../services/alumno.service';
import { GradoGrupoTurno } from '../../models/grado-grupo-turno';
import { MateriaService } from '../../services/materia.service';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrl: './alumno.component.css'
})
export class AlumnoComponent {
  ggt: GradoGrupoTurno = {
    grado: '',
    grupo: '',
    turno: '',
    id: 0
  };
  constructor(private formBuilder: FormBuilder,
    private alumnoService: AlumnoService,
    private materiaService: MateriaService
  ){}

  alumnoForm: FormGroup = this.formBuilder.group({
    nombres: ["", Validators.required],
    apellidos: ["", Validators.required],
    edad: ["", Validators.required],
    grado: ["", Validators.required],
    grupo: ["", Validators.required],
    turno: ["", Validators.required],
  })

  guardar(){
      this.alumnoService.saveAlumno(this.alumnoForm.value).subscribe({
            next: (v) => {
              /*
                this.materiaService.getMateria().subscribe(materia => {
                      materia.forEach((materia)=>{
                        this.mc = materia.nombre+"-"+materia.grado+"-"+materia.grupo+"-"+materia.turno
                        this.materiaCompuesta.push({"id":materia.id, "materiaGG":this.mc})
                      })
                    })
              */
              //this.ggt.push({"grado":v.grado, "grupo":v.grupo, "turno":v.turno})
              this.ggt.id = v.id
              this.ggt.grado = v.grado
              this.ggt.grupo = v.grupo
              this.ggt.turno = v.turno
              console.log(this.ggt)
              this.materiaService.busquedaGradoGrupoTurno(this.ggt).subscribe(response => {
                console.log(response)
              })
              Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Alumno agregado correctamente",
              showConfirmButton: false,
              timer: 1500
              })
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
}
