import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';

const base_url=environment.base_url;


@Injectable({
	providedIn: 'root'
})
export class EntrenamientoService {

	constructor(private http:HttpClient) { }
	get token():string {
		return localStorage.getItem('token') || '';
	}

	get headers(){
		return {
			headers:{
				'x-token':this.token
			}
		}
	}
	getEmociones(desde){

		//http://localhost:3800/api/entrenamiento?desde=5
		return this.http.get<any>(`${base_url}entrenamiento?desde=${desde}`, this.headers)
						.pipe(map(res => {
							return {
								emocion: res.emocion
							}
						}))
	}

	crearEntrenamiento( formData ){
		//http://localhost:3800/api/entrenamiento
		return this.http.post<any>(`${base_url}entrenamiento`, formData )
				/* .pipe(map( (res) => {
					return res.usuario
				})) */
	}

	getEntrenamientos(desde){

		//http://localhost:3800/api/entrenamiento/lista?desde=0

		return this.http.get<any>(`${base_url}entrenamiento/lista?desde=${desde}`, this.headers)
						.pipe(map(res => {
							
							return {
								entrenamientos: res.entrenamientos,
								total:res.total,
							}
							
						}))
	}

	getEntrenamientoPaciente(idPaciente){
		//http://localhost:3800/api/entrenamiento/paciente/6046f17909d8634f843d294b
		return this.http.get<any>(`${base_url}entrenamiento/paciente/${idPaciente}`, this.headers)
						.pipe(map(res => {
							return {
								entrenamientos: res.entrenamientos
							}
						}))
	}


	deleteEntrenamiento(idPrueba){
		return this.http.delete(`${base_url}entrenamiento/${idPrueba}`)
	}





}
