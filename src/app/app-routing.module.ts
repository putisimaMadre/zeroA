import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfesorComponent } from './components/profesor/profesor.component';
import { ProfesorMateriaComponent } from './components/profesor-materia/profesor-materia.component';
import { MateriaComponent } from './components/materia/materia.component';
import { AlumnoComponent } from './components/alumno/alumno.component';
import { AlumnoListComponent } from './components/alumno-list/alumno-list.component';

const routes: Routes = [
  {
    path:"profesor",
    component: ProfesorComponent
  },
  {
    path:"profesor-materia",
    component: ProfesorMateriaComponent
  },
  {
    path:"materia",
    component: MateriaComponent
  },
  {
    path:"alumno",
    component: AlumnoComponent
  },
  {
    path:"list",
    component: AlumnoListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
