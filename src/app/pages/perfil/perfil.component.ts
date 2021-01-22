import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
	selector: 'app-perfil',
	templateUrl: './perfil.component.html',
	styleUrls: [
		'./perfil.component.css'
	]
})
export class PerfilComponent implements OnInit {

	public header = document.querySelector('.logo-header');
	public headerTop = document.querySelector('.navbar');
	public sidebar = document.querySelector('.sidebar');
	public body = document.querySelector('#colorBody');
	
	public usuario:Usuario;
	public imageSubir: File;
	public imageTemp:any = '';


	perfilUsuario:FormGroup;
	cambioPassword:FormGroup;  


	constructor(private userService:UsuariosService,
				private fb:FormBuilder,
				private fileUploadService:FileUploadService) { 
		this.usuario = this.userService.usuario;
		this.creaFormPerfil();
		
	}
	
	ngOnInit(): void {
		this.datosPerfil();

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

	creaFormPerfil(){
		this.perfilUsuario = this.fb.group({
			userNombres:[this.usuario.userNombres ],
			userApellidos:[ this.usuario.userApellidos ],
			userEmail:[ this.usuario.userEmail ],
			userContacto:[ this.usuario.userContacto ],
			userSobreMi:[ this.usuario.userSobreMi ]
		})
	}

	datosPerfil(){
		this.perfilUsuario.reset({
			userNombres:this.usuario.userNombres ,
			userApellidos: this.usuario.userApellidos ,
			userEmail: this.usuario.userEmail ,
			userContacto: this.usuario.userContacto ,
			userSobreMi: this.usuario.userSobreMi 
		})
	}

	savePassword(){

	}
	actualizaPerfil(){
		
		if(this.imageSubir){
			this.subirImagen();
		}

		this.userService.actualizaUsuario( this.perfilUsuario.value ).subscribe( res => {

			const { userNombres, userApellidos, userContacto, userSobreMi } = res['usuario'];
			this.usuario.userNombres = userNombres;
			this.usuario.userApellidos = userApellidos;
			this.usuario.userContacto =  userContacto;
			this.usuario.userSobreMi = userSobreMi;
			
		},
		err=>{
			console.log(err)
		})

	}



	cambiarImagen( file: File  ){
		this.imageSubir = file;
		if(!file) {
			return this.imageTemp=null;
		}
		const reader = new FileReader();
		const base64 = reader.readAsDataURL(file);
		reader.onloadend = () => {
			this.imageTemp = reader.result;
			//console.log(reader.result);
		}
	}

	subirImagen(){
		this.fileUploadService.cargarFoto(this.imageSubir,'usuarios',this.usuario._id )
		.then(img => this.usuario.userAvatar = img )
	}


	
}
