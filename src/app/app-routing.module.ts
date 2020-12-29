import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';

const routes: Routes = [
  { path:'', 
    component:PagesComponent,
    children:[

      { path:'inicio', component:DashboardComponent },
      { path:'usuarios', component:UsuariosComponent },
      { path:'', redirectTo:'inicio', pathMatch:'full' },  
        
    ]
  },
  
  { path:'login', component:LoginComponent },
  
  { path:'', redirectTo:'inicio', pathMatch:'full' },
  { path:'**',component:NopagefoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
