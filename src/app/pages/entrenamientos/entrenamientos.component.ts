import { Component, OnInit } from '@angular/core';
import { Entrenamiento } from 'src/app/models/entrenamiento.model';
import { EntrenamientoService } from 'src/app/services/entrenamiento.service';

@Component({
	selector: 'app-entrenamientos',
	templateUrl: './entrenamientos.component.html',
	styles: [
	]
})
export class EntrenamientosComponent implements OnInit {

	public entrenamientos: Entrenamiento[] = [];

	constructor(
		private entrenamientoService: EntrenamientoService
	) {
		this.cargarPruebas();
	}

	ngOnInit(): void {
	}


	cambiarPagina(desde) {

	}

	cargarPruebas() {
		this.entrenamientoService.getEntrenamientos(0).subscribe(res => {
			this.entrenamientos=res.entrenamientos
		})
	}

}
