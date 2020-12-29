import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [
    DashboardComponent,
    UsuariosComponent,
    PagesComponent,
    
  ],
  exports:[
    DashboardComponent,
    UsuariosComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
  ]
})
export class PagesModule { }
