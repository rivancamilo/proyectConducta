import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2'

@Component({
	selector: 'app-usuario',
	templateUrl: './usuario.component.html',
	styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

	nuevoUsuario: FormGroup;//referencia local del formulario

	constructor(	private fb: FormBuilder,
					private userService:UsuariosService
	) { 
			
		this.crearFormulario();

	}
				
	ngOnInit(): void {			


	}


	crearFormulario(){

		this.nuevoUsuario = this.fb.group({
			userNombres: ['', [ Validators.required ] ],
			userApellidos: ['', [ Validators.required ] ],
			userEmail: ['', [ Validators.required ] ],
			userEstado: [ '' , [ Validators.required ] ],
			userRolID: ['', [ Validators.required ] ],
			userDateAdd: ['', [ Validators.required ] ],
			userContacto: ['', [ Validators.required ] ],
			userPassword: ['', [ Validators.required ] ],
			userConfirPassword: ['', [ Validators.required ] ],
			userSobreMi: ['', [ Validators.required ] ],
			userAvatar: ['', [ Validators.required ] ],
		})

	}


	crearUsuario() {
		/***********************************************************************************
		Validamos si el formulario es valido de no ser asi retornamos el posteo 
		***********************************************************************************/
		if (this.nuevoUsuario.invalid) {
			return Object.values(this.nuevoUsuario.controls).forEach(control => {
				control.markAllAsTouched();
				console.log('Error campos invalidos')
			});
		}

		
		//
		this.userService.crearUsuario(this.nuevoUsuario.value).subscribe(res =>{

		},err =>{
			console.warn(err)
		})

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

	get userApellidosNoValid() {
		return this.nuevoUsuario.get('userApellidos').invalid && this.nuevoUsuario.get('userApellidos').touched;
	}

	get userApellidosValid() {
		return this.nuevoUsuario.get('userApellidos').valid && this.nuevoUsuario.get('userApellidos').touched;
	}

	get userEstadoValid() {
		return this.nuevoUsuario.get('userEstado').valid && this.nuevoUsuario.get('userEstado').touched;
	}

	get userRolIDNoValid() {
		return this.nuevoUsuario.get('userRolID').invalid && this.nuevoUsuario.get('userRolID').touched;
	}

	get userRolIDValid() {
		return this.nuevoUsuario.get('userRolID').valid && this.nuevoUsuario.get('userRolID').touched;
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

		return (pass1 === pass2) ? true : false;
	}

	get userConfirPasswordValid() {

		const pass1 = this.nuevoUsuario.get('userPassword').value;
		const pass2 = this.nuevoUsuario.get('userConfirPassword').value;

		return (pass1 === pass2 && this.nuevoUsuario.get('userConfirPassword').touched) ? true : false;
	}



}
