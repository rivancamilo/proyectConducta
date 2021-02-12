import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-perfil',
	templateUrl: './perfil.component.html',
	styleUrls: [
		'./perfil.component.css'
	]
})
export class PerfilComponent implements OnInit {

	public usuario:Usuario;
	public imageSubir: File;
	public imageTemp:any = '';
	
	/* PROPIEDADES PARA EL CAMBIO DE COLOR EN EL DASHBOARD */
	public header = document.querySelector('.logo-header');
	public headerTop = document.querySelector('.navbar');
	public sidebar = document.querySelector('.sidebar');
	public body = document.querySelector('#colorBody');
	
	


	perfilUsuario:FormGroup;
	cambioPassword:FormGroup;  


	constructor(private userService:UsuariosService,
				private fb:FormBuilder,
				private fileUploadService:FileUploadService) { 

		this.usuario = this.userService.usuario;
		this.creaFormPerfil();//INSTANCIA PARA CREAR FORM DATOS PERFIL
		this.creaFormPassword();//INSTANCIA PARA CREAR FORM ACTUALIZAR CONTRASEÑA DEL USUARIO
	}
	

	ngOnInit(): void {
		this.datosPerfil();

	}


	/****************************************************************************************
	* 		ACTUALIZAMOS LOS DATOS DEL USUARIO 
	****************************************************************************************/
	/* creamos la instancia de los campos que tiene el formulario perfil */
	creaFormPerfil(){
		this.perfilUsuario = this.fb.group({
			userNombres:[this.usuario.userNombres ],
			userApellidos:[ this.usuario.userApellidos ],
			userEmail:[ {value:this.usuario.userEmail , disabled:true } ],
			userContacto:[ this.usuario.userContacto ],
			userSobreMi:[ this.usuario.userSobreMi ]
		})
	}

	

	/* Cargamos los datos del usuario en el input */
	datosPerfil(){
		this.perfilUsuario.reset({
			userNombres:this.usuario.userNombres ,
			userApellidos: this.usuario.userApellidos ,
			userEmail: this.usuario.userEmail ,
			userContacto: this.usuario.userContacto ,
			userSobreMi: this.usuario.userSobreMi 
		})
	}

	/* detectamos si el input a tenido algun cambio */
	cambiarImagen( file: File  ){

		this.imageSubir = file;
		if(!file) {
			return this.imageTemp=null;
		}
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			this.imageTemp = reader.result;
			//console.log(reader.result);
		}
	}
	/* ejecutamos el servicio que actualiza la imagen del usuario */
	subirImagen(){
		this.fileUploadService.cargarFoto(this.imageSubir,'usuarios',this.usuario._id )
		.then(img => this.usuario.userAvatar = img )
	}
	/* actualizamos todos los datos del usuario */ 
	actualizaPerfil(){
		//validamos si el usuario subio una imagen
		if(this.imageSubir){
			this.subirImagen();
		}
		/* ejecutamos el servicio para actualizar los datos  */
		this.userService.actualizaUsuario( this.perfilUsuario.value ).subscribe( res => {

			const { userNombres, userApellidos, userContacto, userSobreMi } = res['usuario'];
			this.usuario.userNombres = userNombres;
			this.usuario.userApellidos = userApellidos;
			this.usuario.userContacto =  userContacto;
			this.usuario.userSobreMi = userSobreMi;
			Swal.fire({
				icon: 'success',
				title: 'Datos Actualizados!',
				text: 'Se han actualizado correctamente los datos',
			})
		},
		err=>{
			//console.log(err.error.msg)
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: err.error.msg ,
			})
		})

	}




	/****************************************************************************************
	* 		ACTUALIZAMOS LA CONTRASEÑA DEL USUARIO 
	****************************************************************************************/
	creaFormPassword(){
		this.cambioPassword = this.fb.group({
			userActualPass: [,Validators.required],
			userPassword:[,Validators.required],
			userConfirPassword:[,Validators.required]
		})
	}

	savePassword(){
		console.log( this.cambioPassword.value )
	}
	
	get invalidActualPass(){
		return this.cambioPassword.get('userActualPass').invalid && this.cambioPassword.get('userActualPass').touched;
	}

	get invalidPassword(){
		return this.cambioPassword.get('userPassword').invalid && this.cambioPassword.get('userPassword').touched;
	}

	get invalidConfirPassword(){
		return this.cambioPassword.get('userConfirPassword').invalid && this.cambioPassword.get('userConfirPassword').touched;
	}

	/*********************************************************************************

	*********************************************************************************/
	cambioColorHeader(color: string) {
		this.header.setAttribute('data-background-color', color);
	}
	cambioColorHeaderT(color: string) {
		this.headerTop.setAttribute('data-background-color', color);
	}

	cambioSidebar(color: string){
		this.sidebar.setAttribute('data-background-color', color);
	}

	cambioBody( color: string ){
		this.body.setAttribute('data-background-color', color);
	}
	
}
