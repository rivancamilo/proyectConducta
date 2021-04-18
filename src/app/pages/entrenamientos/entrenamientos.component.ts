import { Component, OnInit } from '@angular/core';
import { Entrenamiento } from 'src/app/models/entrenamiento.model';
import { EntrenamientoService } from 'src/app/services/entrenamiento.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-entrenamientos',
	templateUrl: './entrenamientos.component.html',
	styles: [
	]
})
export class EntrenamientosComponent implements OnInit {

	public entrenamientos: Entrenamiento[] = [];
	public desde: number = 0;
	public totalPruebas: number = 0;
	public aviso:boolean= false;

	constructor(
		private entrenamientoService: EntrenamientoService
	) {
		this.cargarPruebas();
	}

	ngOnInit(): void {
		this.cargarPruebas();
	}


	cambiarPagina(valor: number) {
		this.desde += valor;
		if (this.desde < 0) {
			this.desde = 0;
		} else if (this.desde >= this.totalPruebas) {
			this.desde -= valor;
		}
		this.cargarPruebas();
	}

	cargarPruebas() {

		this.entrenamientoService.getEntrenamientos(this.desde).subscribe(res => {
			//console.log(res.entrenamientos)
			if(res.entrenamientos.length === 0){
				this.aviso = true;
			}else{
				this.totalPruebas = res.total;
				this.entrenamientos = res.entrenamientos
			}
		})
	}

	eliminarPrueba(prueba,indice){
		console.log(prueba)
		Swal.fire({
			title: 'Esta segur@?',
			text: "¡Una vez elimines la prueba, los cambios NO se puede deshacer!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, Eliminar',
			cancelButtonText: 'No',
		}).then((result) => {
			if (result.isConfirmed) {

				this.entrenamientoService.deleteEntrenamiento(prueba._id).subscribe(resp => {

					this.entrenamientos.splice(indice, 1);

					Swal.fire(
						'Prueba Eliminada!',
						'¡Se ha eliminado satisfactoriamente la prueba!',
						'success'
					)
					this.cargarPruebas();

				})
				
			}
		})
	}



}
