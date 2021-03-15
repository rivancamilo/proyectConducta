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

            { path: '', component: DashboardComponent },
            { path: 'usuarios', component: UsuariosComponent },
            { path:'usuario', component:UsuarioComponent },
            { path:'usuario/:id', component:UsuarioComponent },
            { path:'entrenamiento/:id' , component:EntrenamientoComponent },
            { path:'entrenamientos', component:EntrenamientosComponent },
            { path:'resultados/:id', component:GraficasComponent },
            { path:'paciente', component:PacienteComponent },
            { path:'paciente/:id', component:PacienteComponent },
            { path:'pacientes', component:PacientesComponent},
            { path:'perfil', component:PerfilComponent}
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
