import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
	selector: 'app-usuario',
	templateUrl: './usuario.component.html',
	styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

	nuevoUsuario: FormGroup;//referencia local del formulario

	constructor() { }

	ngOnInit(): void {
	}

	crearUsuario() {

	}


	/**************************************************************************************
	  agregamos get's para las validaciones de los input
	  **************************************************************************************/
	get userNombresNoValid() {
		return this.nuevoUsuario.get('userNombres').invalid && this.nuevoUsuario.get('userNombres').touched;
	}
	get userNombresValid() {
		return this.nuevoUsuario.get('userNombres').valid && this.nuevoUsuario.get('userNombres').touched;
	}

	get userEmailNoValid() {
		return this.nuevoUsuario.get('userEmail').invalid && this.nuevoUsuario.get('userEmail').touched;
	}
	get userEmailValid() {
		return this.nuevoUsuario.get('userEmail').valid && this.nuevoUsuario.get('userEmail').touched;
	}

	get userPasswordNoValid() {
		return this.nuevoUsuario.get('userPassword').invalid && this.nuevoUsuario.get('userPassword').touched;
	}

	get userPasswordValid() {
		return this.nuevoUsuario.get('userPassword').valid && this.nuevoUsuario.get('userPassword').touched;
	}


	get userConfirPasswordNoValid() {

		const pass1 = this.nuevoUsuario.get('userPassword').value;
		const pass2 = this.nuevoUsuario.get('userConfirPassword').value;

		return (pass1 === pass2) ? false : true;
	}

	get userConfirPasswordValid() {

		const pass1 = this.nuevoUsuario.get('userPassword').value;
		const pass2 = this.nuevoUsuario.get('userConfirPassword').value;

		return (pass1 === pass2 && this.nuevoUsuario.get('userConfirPassword').touched) ? true : false;
	}
}
