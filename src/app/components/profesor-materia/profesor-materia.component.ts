import { Component, OnInit } from '@angular/core';
import { ProfesorService } from '../../services/profesor.service';
import { Profesor } from '../../models/profesor';
import { MateriaService } from '../../services/materia.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfesorMateriaService } from '../../services/profesor-materia.service';
import Swal from 'sweetalert2'

interface materiaCompuesta{
  "id": number,
  "materiaGG": string
}

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor-materia.component.html',
  styleUrl: './profesor-materia.component.css'
})
export class ProfesorMateriaComponent implements OnInit{
  profesores!: Profesor[];
  materiaCompuesta: materiaCompuesta[] = [];
  mc!: string

  constructor(
    private profesorService: ProfesorService,
    private materiaService: MateriaService,
    private formBuilder: FormBuilder,
    private profesorMateriaService: ProfesorMateriaService
  ){}

  ngOnInit(): void {
    this.profesorService.getProfesor().subscribe(profesor => this.profesores = profesor)
    this.materiaService.getMaterias().subscribe(materia => {
      materia.forEach((materia)=>{
        this.mc = materia.nombre+"-"+materia.grado+"-"+materia.grupo+"-"+materia.turno
        this.materiaCompuesta.push({"id":materia.id, "materiaGG":this.mc})
      })
    })
  }

  profesorForm: FormGroup = this.formBuilder.group({
    idProfesor: ["", Validators.required],
    idMateria: ["", Validators.required]
  })

  guardar(){
    this.profesorMateriaService.saveProfesorMateria(this.profesorForm.value).subscribe({
          next: (v) => Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Asignación agregada correctamente",
            showConfirmButton: false,
            timer: 1500
          }),
          error: (e) => Swal.fire({
            icon: "error",
            title: "Problema al guardar"+e,
            text: "Hubo algun problema en la asignacion de los Datos",
            footer: 'No se logro guardar la informacion'
          }),
          complete: () => console.info('complete') 
        })
  }

}
