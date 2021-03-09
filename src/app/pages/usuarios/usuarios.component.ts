import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-usuarios',
	templateUrl: './usuarios.component.html',
	styles: [
	]
})
export class UsuariosComponent implements OnInit {

	public totalUsuarios: number = 0;
	public usuarios: Usuario[] = [];
	public usuariosTemp: Usuario[] = [];
	public desde: number = 0;
	public cargando: boolean = true;

	constructor(private usuarioService: UsuariosService,
		private busquedaService: BusquedasService) {
			this.cargarUsuario();
	}

	ngOnInit(): void {
		this.cargarUsuario();
	}

	cambiarPagina(valor: number) {
		this.desde += valor;
		if (this.desde < 0) {
			this.desde = 0;
		} else if (this.desde >= this.totalUsuarios) {
			this.desde -= valor;
		}
		this.cargarUsuario();
	}

	cargarUsuario() {
		this.cargando = true;
		this.usuarioService.cargarUsuario(this.desde).subscribe(({ total, usuario }) => {
			this.totalUsuarios = total;
			this.usuarios = usuario;
			this.usuariosTemp = usuario;
			this.cargando = false
		})
	}


	buscar(termino) {
		if (termino.length === 0) {
			return this.usuarios = this.usuariosTemp;
		}

		this.busquedaService.busqueda('usuarios', termino).subscribe((resp:Usuario[]) => {
			this.usuarios = resp
			//console.log(resp)
		})
	}

	eliminarUsuario(idUsuarioDelete, indice: number) {

		if (idUsuarioDelete === this.usuarioService.idUser) {
			return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'No puede eliminarse a si mismo!',
			})
		}else{

			Swal.fire({
				title: 'Esta segur@?',
				text: "¡Una vez elimines el usuario, los cambios NO se puede deshacer!",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Si, Eliminar',
				cancelButtonText: 'No',
			}).then((result) => {
				if (result.isConfirmed) {
	
					this.usuarioService.eliminarUsuario(idUsuarioDelete).subscribe(resp => {
						this.usuarios.splice(indice, 1);
						Swal.fire(
							'Usuario Eliminado!',
							'¡Se ha eliminado satisfactoriamente el usuario!',
							'success'
						)
					})
					
				}
			})

		}
		


	}


}
