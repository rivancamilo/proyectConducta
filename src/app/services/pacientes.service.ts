import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Paciente } from '../models/paciente.model';
import { CargarPacientes } from '../interfaces/carga-pacientes.interface';


const base_url = environment.base_url;

@Injectable({
	providedIn: 'root'
})
export class PacientesService {

	constructor(private http: HttpClient) { }

	get token(): string {
		return localStorage.getItem('token') || '';
	}

	get headers() {
		return {
			headers: {
				'x-token': this.token
			}
		}
	}

	crearPaciente(data) {
		//http://localhost:3800/api/pacientes
		return this.http.post<any>(`${base_url}pacientes`, data, this.headers)
			.pipe(map((res) => {
				return res.paciente
			}))
	}



	
	cargarPaciente(desde){
		//http://localhost:3800/api/pacientes?desde=5
		return this.http.get<CargarPacientes>(`${base_url}pacientes?desde=${desde}`, this.headers)
				.pipe(map( res => {
					
					const pacientes = res.paciente.map( cliente => new Paciente(cliente.pacienteNombres, cliente.pacienteApellidos, 
											cliente.pacienteTipoID, cliente.pacienteNumID, cliente.pacienteDateNaci,cliente.pacienteEPS, 
											cliente.pacienteCiudad,cliente.pacienteDireccion, cliente.pacienteEdad, cliente.pacienteFoto))

					return {
						total:res.total,
						paciente:pacientes
					}
				} ))
	}


}
