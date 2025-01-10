import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ProfesorMateriaComponent } from './components/profesor-materia/profesor-materia.component';
import { MateriaComponent } from './components/materia/materia.component';
import { ProfesorComponent } from './components/profesor/profesor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { provideHttpClient } from '@angular/common/http';
import { MenuComponent } from './components/menu/menu.component';
import { AlumnoComponent } from './components/alumno/alumno.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfesorMateriaComponent,
    MateriaComponent,
    ProfesorComponent,
    MenuComponent,
    AlumnoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
