import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { EntrenamientoComponent } from './entrenamiento/entrenamiento.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { PerfilComponent } from './perfil/perfil.component';
import { EntrenamientosComponent } from './entrenamientos/entrenamientos.component';
import { PacienteComponent } from './paciente/paciente.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { AuthGuard } from '../guards/auth.guard';
import { GraficasComponent } from './graficas/graficas.component';



const routes: Routes = [

    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [

            { path: '', component: DashboardComponent, data:{titulo:'Dashboard'} },
            { path: 'usuarios', component: UsuariosComponent, data:{titulo:'Lista de Usuarios'} },
            { path:'usuario', component:UsuarioComponent, data:{titulo:'Usuario'}},
            { path:'usuario/:id', component:UsuarioComponent, data:{titulo:'Usuario'} },
            { path:'entrenamiento/:id' , component:EntrenamientoComponent, data:{titulo:'Entrenamiento'} },
            { path:'entrenamientos', component:EntrenamientosComponent, data:{titulo:'Lista de Entrenamientos'} },
            { path:'resultados/:id', component:GraficasComponent, data:{titulo:'Resultados'} },
            { path:'paciente', component:PacienteComponent, data:{titulo:'Paciente'} },
            { path:'paciente/:id', component:PacienteComponent, data:{titulo:'Paciente'} },
            { path:'pacientes', component:PacientesComponent, data:{titulo:'Lista de Pacientes'}},
            { path:'perfil', component:PerfilComponent, data:{titulo:'Perfil de Usuario'}}
        ]
    },

    //{ path: 'path/:routeParam', component: MyComponent },
    //{ path: 'staticPath', component: ... },
    //{ path: '**', component: ... },
    //{ path: 'oldPath', redirectTo: '/staticPath' },
    //{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
