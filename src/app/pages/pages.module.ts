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




@NgModule({
  declarations: [
    DashboardComponent,
    UsuariosComponent,
    PagesComponent,
    UsuarioComponent,
    EntrenamientoComponent,
    PerfilComponent,
    
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
    ChartsModule
  ]
})
export class PagesModule { }
