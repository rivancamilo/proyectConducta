import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { loginForm } from '../interfaces/login-form.interface';
import { RegUsuarioForm } from '../interfaces/reg-form-usuario.interface';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { Usuario } from '../models/usuario.model';
import { perfilUsuario } from '../interfaces/update-perfil-form-interface';
import { CargarUsuarios } from '../interfaces/cargar-usuarios.interface';
import { DatosUsuario } from '../interfaces/datos-usuario.interface';
import { FormGroup } from '@angular/forms';

const base_url = environment.base_url;

@Injectable({
	providedIn: 'root'
})
export class UsuariosService {

	public usuario:Usuario;

	constructor(
		private http: HttpClient,
		private router:Router
	) { }

	get token():string {
		return localStorage.getItem('token') || '';
	}

	get idUser():string {
		return this.usuario._id;
	}

	get headers(){
		return {
			headers:{
				'x-token':this.token
			}
		}
	}

	login(formData:loginForm ){
		return this.http.post(`${base_url}login`, formData )
						.pipe(
								tap( (resp:any) => {
									localStorage.setItem('token',resp.token)
								})
							)
	}

	logout(){
		localStorage.removeItem('token');
		this.router.navigateByUrl('/login');
	}

	validarToken(): Observable<boolean>{
		

		return this.http.get(`${base_url}login/renewtoken`,this.headers).pipe(
			map( (res:any) =>{

				const {	userNombres,
						userApellidos,
						userEmail,
						userEstado,
						userRolID,
						userDateAdd,
						userContacto,
						userPassword,
						userSobreMi,
						userAvatar,
						_id } = res.usuario ;
				


				localStorage.setItem('token', res.token);
				this.usuario = new Usuario( userNombres, userApellidos,userEmail,userEstado, userRolID, 
											userDateAdd,userContacto, '' , userSobreMi, userAvatar, _id );
											
				return true;
				
			}),
			catchError(erro => of(false))
		)

	}

	cargarUsuario(desde){
		//http://localhost:3800/api/usuarios?desde=0
		return this.http.get<CargarUsuarios>(`${base_url}usuarios?desde=${desde}`, this.headers)
				.pipe(map( res => {
					const usuarios = res.usuario.map( user => new Usuario(user.userNombres, user.userApellidos, 
						user.userEmail, user.userEstado, user.userRolID, '' , user.userContacto, '', 
						user.userSobreMi, user.userAvatar, user._id))

					return {
						total:res.total,
						usuario:usuarios
					}
				} ))
	}

	crearUsuario( formData: RegUsuarioForm ){
		//console.log('creando usuario')
		return this.http.post<any>(`${base_url}usuarios`, formData )
				.pipe(map( (res) => {
					return res.usuario
				}))
	}

	actualizaUsuario( data:perfilUsuario ){
		//http://localhost:3800/api/usuarios/5ffb6522a6303a183c79d969
		const datos = { ...data , formulario:'perfil' }
		return this.http.put<any>(`${base_url}usuarios/${this.idUser}`, datos , this.headers)

	}

	eliminarUsuario(IDusuario){
		//http://localhost:3800/api/usuarios/5ffb6522a6303a183c79d969
		return  this.http.delete(`${base_url}usuarios/${IDusuario}`, this.headers)
	}

	datosUsuario(idUsuario){
		//http://localhost:3800/api/usuarios/601caa227f208b1fd4a91f25
		return this.http.get<any>(`${base_url}usuarios/${idUsuario}`, this.headers)
				.pipe(map( (res) => {
					const datos = res.usuario;
					const usuarios = new Usuario(datos.userNombres, datos.userApellidos, 
						datos.userEmail, datos.userEstado, datos.userRolID, '' , datos.userContacto, '', 
						datos.userSobreMi, datos.userAvatar, datos._id) 

					return usuarios

				} ))
	}


	editarUsuarios( data, idUsuario ){
		//http://localhost:3800/api/usuarios/601caa227f208b1fd4a91f25
		
		const datos = { ...data, formulario:'usuario' }

		return this.http.put<any>(`${base_url}usuarios/${idUsuario}`, datos , this.headers)
					.pipe(map( (res) => {
						return res.usuario
					}))
	}


	passwordIguales(pass1:string, pass2:string){

		return ( formGroup:FormGroup ) => {

			const pass1Control = formGroup.controls[pass1];
			const pass2Control = formGroup.controls[pass2];

			if( pass1Control.value === pass2Control.value ){
				pass2Control.setErrors(null)
			}else{
				pass2Control.setErrors({noEsIgual: true })
			}

		}
	}

	validaPass( id:string, passActual:string ){
		//http://localhost:3800/api/usuarios/valida/584375uhfdgjkhfd
		const datos = {
			passActual
		}
		return this.http.post<any>(`${base_url}usuarios/valida/${id}`,datos,this.headers)
		.pipe(map(res => {
			return res.ok
		}))

	}


	cambioPasword(id:string, nuevoPass:string){
		//http://localhost:3800/api/usuarios/cambiopass/584375uhfdgjkhfd
		const datos = { userPassword:nuevoPass }
		return this.http.post(`${base_url}usuarios/cambiopass/${id}`,datos,this.headers)

	}

}
