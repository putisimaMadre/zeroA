import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfesorService } from '../../services/profesor.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-datos-personales',
  templateUrl: './profesor.component.html',
  styleUrl: './profesor.component.css'
})
export class ProfesorComponent {
  constructor(private formBuilder: FormBuilder,
    private profesorService: ProfesorService
  ){}

  profesorForm: FormGroup = this.formBuilder.group({
    nombre: ["", Validators.required],
    telefono: ["", Validators.required],
    edad: ["", Validators.required],
  })

  guardar(){
    this.profesorService.saveProfesor(this.profesorForm.value).subscribe({
              next: (v) => Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Datos agregados correctamente",
                showConfirmButton: false,
                timer: 1500
              }),
              error: (e) => Swal.fire({
                icon: "error",
                title: "Problema al guardar"+e,
                text: "Hubo algun problema al guardar los Datos",
                footer: 'No se logro guardar la informacion'
              }),
              complete: () => console.info('complete') 
            })
    /*this.datosPersonalesService.saveDatos(this.datosPersonalesForm.value).subscribe()
    console.log(this.datosPersonalesForm.value)*/
  }
}
