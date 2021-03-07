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
											cliente.pacienteCiudad,cliente.pacienteDireccion, cliente.pacienteEdad, cliente.pacienteFoto, cliente._id))

					return {
						total:res.total,
						paciente:pacientes
					}
				} ))
	}


	datosPaciente(idPaciente){
		//http://localhost:3800/api/pacientes/602344d8c8d6d33b7ce5cbda
		return this.http.get<any>(`${base_url}pacientes/${idPaciente}`, this.headers)
				.pipe(map( (res) => {
					const datos = res.paciente;
					const paciente = new Paciente(datos.pacienteNombres, datos.pacienteApellidos, 
						datos.pacienteTipoID, datos.pacienteNumID, datos.pacienteDateNaci,datos.pacienteEPS, 
						datos.pacienteCiudad,datos.pacienteDireccion, datos.pacienteEdad, datos.pacienteFoto, datos._id) 

					return paciente

				} ))
	}

	updatePaciente(data,idPaciente){
		//http://localhost:3800/api/pacientes/5ffba19326ca0c45248243df
		return this.http.put<any>(`${base_url}pacientes/${idPaciente}`,data, this.headers).pipe(map(resp => {
			return resp.paciente
		}))
	}

	deletePaciente(paciente:Paciente){
		//http://localhost:3800/api/pacientes/5ffba2e826ca0c45248243e0
		return this.http.delete(`${base_url}pacientes/${paciente._id}`, this.headers)
	}

}
