import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styles: [
  ]
})
export class PacienteComponent implements OnInit {

  nuevoUsuario:FormGroup;

  constructor() { }

  ngOnInit(): void {
  }
  crearUsuario(){
    
  }
}
