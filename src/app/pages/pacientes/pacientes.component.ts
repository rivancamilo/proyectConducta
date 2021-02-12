import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/models/paciente.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { PacientesService } from 'src/app/services/pacientes.service';

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
	){ }

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


}
