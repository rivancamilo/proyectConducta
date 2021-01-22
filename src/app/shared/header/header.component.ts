import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public usuario:Usuario

  constructor(private userService:UsuariosService) { 
    this.usuario = userService.usuario;
  }

  ngOnInit(): void {
  }

  logout(){
    this.userService.logout();
  }

}
