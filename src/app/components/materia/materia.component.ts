import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MateriaService } from '../../services/materia.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrl: './materia.component.css'
})
export class MateriaComponent {
  concatenado: string = "";

  constructor(private formBuilder: FormBuilder,
    private materiaService: MateriaService
  ){}

  materiaForm: FormGroup = this.formBuilder.group({
    nombre: ["", Validators.required],
    grado: ["", Validators.required],
    grupo: ["", Validators.required],
    turno: ["", Validators.required],
    concatenado: [""]
  })

  guardar(){
    this.concatenado = this.materiaForm.get("nombre")?.value + this.materiaForm.get("grado")?.value + this.materiaForm.get("grupo")?.value + this.materiaForm.get("turno")?.value;
    this.materiaForm.controls["concatenado"].setValue(this.concatenado)
    this.materiaService.saveMateria(this.materiaForm.value).subscribe({
      next: (v) => Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Materia agregada correctamente",
        showConfirmButton: false,
        timer: 1500
      }),
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
}
