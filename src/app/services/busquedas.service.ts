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

	constructor(private http: HttpClient,) { }

	get token(): string {
		return localStorage.getItem('token') || '';
	}

	private transFormarUsuarios( resultados:any[] ):Usuario[]{
		return resultados.map( user => new Usuario(user.userNombres,user.userApellidos, 
			user.userEmail, user.userEstado, user.userRolID,'',user.userContacto,'',
			user.userSobreMi,user.userAvatar,user._id))
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
			
				switch (tipo) {
					case 'usuarios':
						return this.transFormarUsuarios(resp.resultados);
						break;
					case 'pacientes':
						return this.transFormarPacientes(resp.resultados);
							break;
					default:
						break;
				}

			}
		))
	}
}
