import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';

const routes: Routes = [
  { path:'inicio', component:DashboardComponent },
  { path:'login', component:LoginComponent },
  { path:'usuarios', component:UsuariosComponent },
  { path:'', redirectTo:'inicio', pathMatch:'full' },
  { path:'**',component:NopagefoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
