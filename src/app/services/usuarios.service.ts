import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { loginForm } from '../interfaces/login-form.interface';
import { RegUsuarioForm } from '../interfaces/reg-form-usuario.interface';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

const base_url = environment.base_url;

@Injectable({
	providedIn: 'root'
})
export class UsuariosService {

	constructor(
		private http: HttpClient,
		private router:Router
	) { }

	crearUsuario( formData: RegUsuarioForm ){
		//console.log('creando usuario')
		return this.http.post(`${base_url}usuarios`, formData )
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
		const token = localStorage.getItem('token') || '';

		return this.http.get(`${base_url}login/renewtoken`,{
			headers:{
				'x-token':token
			}
		}).pipe(
			tap( (res:any) =>{

			localStorage.setItem('token', res.token);
			}),
			map(res => {
				return true
			}),
			catchError(erro => of(false))
		)

	}

}
