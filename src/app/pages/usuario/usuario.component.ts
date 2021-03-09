import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2'

@Component({
	selector: 'app-usuario',
	templateUrl: './usuario.component.html',
	styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

	public imageSubir: File;
	public imageTemp:any = '';
	public nuevoUsuario: FormGroup;//referencia local del formulario
	public idUsuario : string;
	public tituloPage: string;

	constructor(	private fb: FormBuilder,
					private userService:UsuariosService,
					private fileUploadService:FileUploadService,
					private routerParams: ActivatedRoute,
					private router:Router
	) { 
			
		this.crearFormulario();
		this.idUsuario = this.routerParams.snapshot.paramMap.get('id');
		
	}
				
	ngOnInit(): void {
		if (this.idUsuario) {
			this.cargarDataUsuario();
		}
	}

	/****************************************************************** 
		creamos una instancia local de los input del usuario
	******************************************************************/
	crearFormulario(){
		this.nuevoUsuario = this.fb.group({
			userNombres: ['', [ Validators.required ] ],
			userApellidos: ['', [ Validators.required ] ],
			userEmail: ['', [ Validators.required ] ],
			userEstado: [ '' , [ Validators.required ] ],
			userRolID: ['', [ Validators.required ] ],
			userPassword: ['', [ Validators.required ] ],
			userConfirPassword: ['', [ Validators.required ] ],
		},{
			validators:[ this.userService.passwordIguales('userPassword','userConfirPassword')]
		})
	}
	
	/****************************************************************** 
		detectamos si el input a tenido algun cambio 
	******************************************************************/
	cambiarImagen( file: File  ){
		
		this.imageSubir = file;
		if(!file) {
			return this.imageTemp=null;
		}
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			this.imageTemp = reader.result;
		}
	}

	/***************************************************************** 
		ejecutamos el servicio que actualiza la imagen del usuario 
	*****************************************************************/
	subirImagen( idUsuario ){
		this.fileUploadService.cargarFoto(this.imageSubir,'usuarios', idUsuario )
	}

	/*****************************************************************
		Metodo para crear un nuevo usuario 
	*****************************************************************/
	crearUsuario() {
		//enviamos los datos al servicio para crear un nuevo usuario
		this.userService.crearUsuario( this.nuevoUsuario.value ).subscribe( res =>{
			if(this.imageSubir){
				this.subirImagen(res._id)
			}

			Swal.fire({
				title:'Nuevo Usuario',
				text:'¡Se ha registrado un nuevo usuario satisfactoriamente!',
				icon:'success'
			})

			this.router.navigateByUrl('/dashboard/usuarios')

		},err =>{

			Swal.fire({
				title: 'Oops...',
				text: err.error.msg,
				icon:'error'
			})
			
		})

	}

	/********************************************************************************
		Cargamos los datos actuales en la BD del usuario que vamos a editar
	********************************************************************************/
	cargarDataUsuario(){
		this.userService.datosUsuario(this.idUsuario).subscribe( resp => {
			this.imageTemp = resp.getImagen;
			this.nuevoUsuario.reset({
				userNombres:resp.userNombres,
				userApellidos:resp.userApellidos,
				userEmail:resp.userEmail,
				userEstado:resp.userEstado,
				userRolID:resp.userRolID,
			})

		})
	}


	/*****************************************************************
		Metodo para actualizar los datos del usuario 
	*****************************************************************/
	updateUsuario(){

		//console.log(this.nuevoUsuario.value)
		this.userService.editarUsuarios( this.nuevoUsuario.value, this.idUsuario ).subscribe( (res) => {
			if(this.imageSubir){
				this.subirImagen(res._id)
			}
			Swal.fire({
				title:'Usuario Modificado',
				text:'¡Se ha modificado el usuario satisfactoriamente!',
				icon:'success'
			})
			this.router.navigateByUrl('/dashboard/usuarios')
			
		},err =>{
			
			Swal.fire({
				title: 'Oops...',
				text: err.error.msg,
				icon:'error'
			})

		})
	}

	/*****************************************************************
		Metodo para guardar un usuario 
	*****************************************************************/
	guardarUsuario(){
		//Validamos si el formulario es valido de no ser asi retornamos el posteo 

		if (this.nuevoUsuario.invalid) {
			return Object.values(this.nuevoUsuario.controls).forEach(control => {
				control.markAllAsTouched();

				Swal.fire({
					title: 'Oops...',
					text: 'No has ingresado la información completa!',
					icon:'error'
				})

			});
		}


		if (!this.idUsuario) {
			this.crearUsuario();
		} else {
			this.updateUsuario();
		}

	}






	/**************************************************************************************
	  agregamos get's para las validaciones de los input
	**************************************************************************************/
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
	


	



}
