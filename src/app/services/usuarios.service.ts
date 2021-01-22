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
		

		return this.http.get(`${base_url}login/renewtoken`,{
			headers:{
				'x-token':this.token
			}
		}).pipe(
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


	crearUsuario( formData: RegUsuarioForm ){
		//console.log('creando usuario')
		return this.http.post(`${base_url}usuarios`, formData )
	}

	actualizaUsuario( data:perfilUsuario ){
		//http://localhost:3800/api/usuarios/5ffb6522a6303a183c79d969
		return this.http.put(`${base_url}usuarios/${this.idUser}`, data , {
			headers:{
				'x-token':this.token
			}
		})
	}




}
