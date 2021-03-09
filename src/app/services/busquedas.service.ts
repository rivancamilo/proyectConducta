import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { Paciente } from '../models/paciente.model';

const base_url = environment.base_url;

@Injectable({
	providedIn: 'root'
})
export class BusquedasService {

	constructor(private http: HttpClient) { }

	get token(): string {
		return localStorage.getItem('token') || '';
	}

	private transFormarUsuarios( resultados:any[] ):Usuario[]{
		return resultados.map( datos => new Usuario(datos.userNombres, datos.userApellidos, 
			datos.userEmail, datos.userEstado, datos.userRolID, '' , datos.userContacto, '', 
			datos.userSobreMi, datos.userAvatar, datos._id))
	}

	private transFormarPacientes( resultados:any[] ):Paciente[]{
		return resultados.map( cliente => new Paciente(cliente.pacienteNombres, cliente.pacienteApellidos, 
			cliente.pacienteTipoID, cliente.pacienteNumID, cliente.pacienteDateNaci,cliente.pacienteEPS, 
			cliente.pacienteCiudad,cliente.pacienteDireccion, cliente.pacienteEdad, cliente.pacienteFoto))
	}

	busqueda(tipo: 'usuarios' | 'pacientes', termino:string ){
		//http://localhost:3800/api/todo/usuarios/a
		return this.http.get< any [] >(`${base_url}todo/${tipo}/${termino}`,{
			headers:{
				'x-token':this.token
			}
		}).pipe( 
			map( (resp:any) => {
				//return resp.resultados
				switch (tipo) {
					case 'usuarios':
						return this.transFormarUsuarios(resp.resultados);
					default:
						return this.transFormarPacientes(resp.resultados);
						break;
				}

			}
		))
	}
}
