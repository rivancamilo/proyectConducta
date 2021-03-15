import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { EntrenamientoService } from 'src/app/services/entrenamiento.service';

@Component({
	selector: 'app-graficas',
	templateUrl: './graficas.component.html',
	styleUrls: ['./graficas.component.css']
})
export class GraficasComponent implements OnInit {

	//Atributo de opciones
	public lineChartOptions: (ChartOptions & { annotation: any }) = { responsive: true,scales: {},annotation: {}};

	//atributo de data fases
	public lineDataFases: ChartDataSets[] = [];
	public lineDataMomentos: ChartDataSets[] = [];
	public lineDataEvoluacion: ChartDataSets[] = [];

	//atributo de los labels
	public lineChartLabels: Label[] = [];
	
	//atributo para el tipo de grafica
	public lineChartType: ChartType = 'line';
	public idPaciente;
	//creamos los array temporales para las graficas 
	public totalPromeFase1:number []= []
	public totalPromeFase2:number []= []
	public totalPromeFase3:number []= []
	public tMomento1F1:number []= []
	public tMomento2F1:number []= []
	public tMomento1F2:number []= []
	public tMomento2F2:number []= []
	public tMomento1F3:number []= []
	public totalEvolucion:number []= []

	constructor(private routerParams: ActivatedRoute,
				private entrenamientoService: EntrenamientoService) { 

		this.idPaciente = this.routerParams.snapshot.paramMap.get('id');
		this.datosPruebas();
	}

	ngOnInit(): void {}



	datosPruebas(){
		this.entrenamientoService.getEntrenamientoPaciente(this.idPaciente).subscribe( res => {
			//recorremos el array de entrenamientos
			res.entrenamientos.forEach( prueba => {
				//graficas de fases
				this.totalPromeFase1.unshift( Math.round( prueba.totalPromeFase1) );
				this.totalPromeFase2.unshift( Math.round( prueba.totalPromeFase2) );
				this.totalPromeFase3.unshift( Math.round( prueba.totalPromeFase3) );
				this.lineChartLabels.unshift(prueba.dateAplicacion);
				//graficas de momentos
				this.tMomento1F1.unshift( Math.round(prueba.totalPromeM1Fase1) );
				this.tMomento2F1.unshift( Math.round(prueba.totalPromeM2Fase1) );
				this.tMomento1F2.unshift( Math.round(prueba.promedioM1Fase2) );
				this.tMomento2F2.unshift( Math.round(prueba.promedioM2Fase2) );
				this.tMomento1F3.unshift( Math.round(prueba.totalPromeFase3) );
				//grafica de la evolucion
				this.totalEvolucion.unshift( Math.round(prueba.totalEntrenamiento) );

			});
			//***************************************************/

		})
		//agregamos al array las fases
		this.lineDataFases.push({ data:this.totalPromeFase1 , label: 'Fase 1' });
		this.lineDataFases.push({ data:this.totalPromeFase2, label: 'Fase 2' });
		this.lineDataFases.push({ data:this.totalPromeFase3, label: 'Fase 3' })
		//agregamos al array los momentos
		this.lineDataMomentos.push({ data:this.tMomento1F1 , label: 'M1 Fase 1' })
		this.lineDataMomentos.push({ data:this.tMomento2F1 , label: 'M2 Fase 1' })
		this.lineDataMomentos.push({ data:this.tMomento1F2 , label: 'M1 Fase 2' })
		this.lineDataMomentos.push({ data:this.tMomento2F2 , label: 'M2 Fase 2' })
		this.lineDataMomentos.push({ data:this.tMomento1F3 , label: 'Fase 3' })
		//agregamos al array la evolucion
		this.lineDataEvoluacion.push({ data:this.totalEvolucion , label: 'Entrenamiento emocional' })
		
	}


	



}
