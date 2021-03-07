import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/models/paciente.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { PacientesService } from 'src/app/services/pacientes.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-pacientes',
	templateUrl: './pacientes.component.html',
	styleUrls: [
		'./pacientes.component.css'
	]
})
export class PacientesComponent implements OnInit {

	public totalPacientes: number = 0;
	public pacientes: Paciente[] = [];
	public pacientesTemp: Paciente[] = [];
	public desde: number = 0;
	public cargando: boolean = true;

	constructor(
				private pacienteService: PacientesService,
				private busquedaService:BusquedasService
	){ 
		this.cargarPacientes();
	}

	ngOnInit(): void {
		this.cargarPacientes();
	}



	cambiarPagina(valor: number) {
		this.desde += valor;
		if (this.desde < 0) {
			this.desde = 0;
		} else if (this.desde >= this.totalPacientes) {
			this.desde -= valor;
		}
		this.cargarPacientes();
	}

	cargarPacientes() {
		this.cargando = true;
		this.pacienteService.cargarPaciente(this.desde).subscribe(({ total, paciente }) => {
			this.totalPacientes = total;
			this.pacientes = paciente;
			this.pacientesTemp = paciente;
			this.cargando = false
		})
	}

	buscar( termino ){
		if( termino.length === 0 ){
			return this.pacientes = this.pacientesTemp;
		}

		this.busquedaService.busqueda('pacientes',termino).subscribe((resp:any) => {
			this.pacientes = resp
		})
	}

	eliminarPaciente(paciente: Paciente, indice: number) {

		

		Swal.fire({
			title: 'Esta segur@?',
			text: "¡Una vez elimines el paciente, los cambios NO se puede deshacer!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, Eliminar',
			cancelButtonText: 'No',
		}).then((result) => {
			if (result.isConfirmed) {

				this.pacienteService.deletePaciente(paciente).subscribe(resp => {
					this.pacientes.splice(indice, 1);
					Swal.fire(
						'Paciente Eliminado!',
						'¡Se ha eliminado satisfactoriamente el paciente!',
						'success'
					)
				})
				
			}
		})

	}
}
