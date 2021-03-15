import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';
import { EntrenamientoComponent } from './entrenamiento/entrenamiento.component';
import { PerfilComponent } from './perfil/perfil.component';
import { EntrenamientosComponent } from './entrenamientos/entrenamientos.component';
import { PacienteComponent } from './paciente/paciente.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { GraficasComponent } from './graficas/graficas.component';



@NgModule({
  declarations: [
    DashboardComponent,
    UsuariosComponent,
    PagesComponent,
    UsuarioComponent,
    EntrenamientoComponent,
    PerfilComponent,
    EntrenamientosComponent,
    PacienteComponent,
    PacientesComponent,
    GraficasComponent,
    
  ],
  exports:[
    DashboardComponent,
    UsuariosComponent,
    PagesComponent,
    UsuarioComponent,
    EntrenamientoComponent,
    PerfilComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ChartsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
  ]
})
export class PagesModule { }
