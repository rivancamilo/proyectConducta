import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Emociones } from 'src/app/models/emociones.model';
import { EntrenamientoService } from 'src/app/services/entrenamiento.service';
import { ToastrService } from 'ngx-toastr';
import { ResulSelectEmocion } from 'src/app/interfaces/resultado-seletEmocion.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { PacientesService } from 'src/app/services/pacientes.service';
import Swal from 'sweetalert2';
@Component({
	selector: 'app-entrenamiento',
	templateUrl: './entrenamiento.component.html',
	styleUrls: ['./entrenamiento.component.css']
})

export class EntrenamientoComponent implements OnInit {

	public numModulo = 1;
	public idPaciente;
	public imageTemp:any = '';
	public nombrePaciente:string;
	public edadPaciente:string;
	
	emocionesLeft: Emociones[] = [];
	emocionesRight: Emociones[] = [];
	formEntrenamient: FormGroup
	alertError1:Boolean = false;
	alertError2:Boolean = false;
	alertError3:Boolean = false;
	alertError4:Boolean = false;
	alertError5:Boolean = false;
	alertError6:Boolean = false;
	
	//atributos para guardat los promedios
	promedioInsVerbal: number = 0.00;
	promedioExpFacial: number = 0.00;
	promedioSelecEmocion: number = 0.00;
	promedioEmociones: number = 0.00;

	totalPromeM1Fase1: number = 0.00;
	totalPromeM2Fase1: number = 0.00;
	totalPromeFase1: number = 0.00;

	promedioM1Fase2: number = 0.00;
	promedioM2Fase2: number = 0.00;
	totalPromeFase2: number = 0.00;

	totalPromeFase3: number = 0.00;
	totalEntrenamiento: number = 0.00;

	today = new Date();
	dateEntrenamiento:string;
	

	resulSelectEmocion: ResulSelectEmocion [] = [];
	f2CheckObserPm:Boolean=false;
	f2CheckObserSm:Boolean=false;

	primeraFaseFull:number = 0;
	segundaFaseFull:number = 0;
	pasoNextF2Full:number = 0;
	pasoNextF3Full:number = 0;
	terceraFaseFull:number = 0;
	constructor(
		private entrenamientoService: EntrenamientoService,
		private fb: FormBuilder,
		private pacienteService:PacientesService,
		private toastr: ToastrService,
		private routerParams: ActivatedRoute,
		private router:Router
	) {
		this.listaEmociones();
		this.crearFormulario();
		this.idPaciente = this.routerParams.snapshot.paramMap.get('id');
		//calculos para las fecha de la aplicacion
		let dd = String(this.today.getDate()).padStart(2, '0');
		let mm = String(this.today.getMonth() + 1).padStart(2, '0'); //January is 0!
		let yyyy = this.today.getFullYear();
		this.dateEntrenamiento = dd + '/' + mm + '/' + yyyy;

		//cargamos los datos del pacientes
		this.cargarDatosPaciente();
	}
	ngOnInit(): void {}

	calculosFinales(){
		//promedio primer Momento f1
		/* this.promedioInsVerbal=(this.promedioInsVerbal*10);
		this.promedioExpFacial=(this.promedioExpFacial*10); */
		this.totalPromeM1Fase1 = (((this.promedioInsVerbal + this.promedioExpFacial)/2)*10);
		this.totalPromeM2Fase1 =  this.promedioSelecEmocion;
		this.totalPromeFase1 = ((this.totalPromeM1Fase1+this.promedioSelecEmocion)/2);

		this.promedioM1Fase2 = ((Number(this.formEntrenamient.get('f2ValEmocionManifesPm').value) + Number(this.formEntrenamient.get('f2ValRelatoPm').value))/2);
		this.promedioM2Fase2 = ((Number(this.formEntrenamient.get('f2ValEmocionIndicadaSm').value) + Number(this.formEntrenamient.get('f2ValImitacionSm').value))/2);
		this.totalPromeFase2 = ((this.promedioM1Fase2+this.promedioM2Fase2)/2);

		this.totalPromeFase3 = this.promedioEmociones;
		this.totalEntrenamiento = ((this.totalPromeFase1 + this.totalPromeFase2 + this.totalPromeFase3)/3);

	}
	//	cargar datos paciente
	cargarDatosPaciente(){

		this.pacienteService.datosPaciente(this.idPaciente).subscribe( res => {
			this.imageTemp = res.getImagen;
			this.nombrePaciente= `${res.pacienteNombres} ${res.pacienteApellidos}`
			this.edadPaciente = res.pacienteEdad
		})

	}

	crearFormulario() {
		this.formEntrenamient = this.fb.group({

			instruccionVerbal: this.fb.group({
				diversion:[{value: '', disabled: true}],
				emocion:[{value: '', disabled: true}], 
				orgullologros:[{value: '', disabled: true}],
				satisfaccion:[{value: '', disabled: true}],
				tristeza:[''], 
				alegria :[''],
				miedo:[''],
				enojo:[''], 
				desagrado:[''],
				sorpresa:[''],
			}),
			expresionFacial: this.fb.group({
				diversion:[{value: '', disabled: true}],
				emocion:[{value: '', disabled: true}], 
				orgullologros:[{value: '', disabled: true}],
				satisfaccion:[{value: '', disabled: true}],
				tristeza:[''], 
				alegria :[''],
				miedo:[''],
				enojo:[''], 
				desagrado:[''],
				sorpresa:[''],
			}),
			selectEmocion: this.fb.group({
				diversion:[{value: '', disabled: true}],
				emocion:[{value: '', disabled: true}], 
				orgullologros:[{value: '', disabled: true}],
				satisfaccion:[{value: '', disabled: true}],
				tristeza:[''], 
				alegria :[''],
				miedo:[''],
				enojo:[''], 
				desagrado:[''],
				sorpresa:[''],
			}),
			//Fase 2 Primer Momento
			f2CheckObserPm:[false],
			f2ValEmocionManifesPm:[''],
			f2ObservacionManifesPm:[''],
			f2ValRelatoPm:[''],
			f2ObservacionRelatoPm:[''],
			//Fase 2 Segundo Momento
			f2CheckObserSm:[false],
			f2ValEmocionIndicadaSm:[''],
			f2ObservacionEmocionIndicadaSm:[''],
			f2ValImitacionSm:[''],
			f2ObservacionImitacionSm:[''],
			expresionEmocionVcotidiana: this.fb.group({
				diversion:[{value: '', disabled: true}],
				emocion:[{value: '', disabled: true}], 
				orgullologros:[{value: '', disabled: true}],
				satisfaccion:[{value: '', disabled: true}],
				tristeza:[''], 
				alegria :[''],
				miedo:[''],
				enojo:[''], 
				desagrado:[''],
				sorpresa:[''],
			}),

		})
	}


	listaEmociones() {

		this.entrenamientoService.getEmociones(0).subscribe(res => {
			this.emocionesLeft = res.emocion;
		})
		this.entrenamientoService.getEmociones(5).subscribe(res => {
			this.emocionesRight = res.emocion;
		})		

	}

	guardarEntrenamiento() {
		const data = {
			paciente:this.idPaciente,
			dateAplicacion:this.dateEntrenamiento,
			totalPromeM1Fase1:this.totalPromeM1Fase1,
			totalPromeM2Fase1:this.totalPromeM2Fase1,
			totalPromeFase1:this.totalPromeFase1,
			promedioM1Fase2:this.promedioM1Fase2,
			promedioM2Fase2:this.promedioM2Fase2,
			totalPromeFase2:this.totalPromeFase2,
			totalPromeFase3:this.totalPromeFase3,
			totalEntrenamiento:this.totalEntrenamiento,
			...this.formEntrenamient.value,
			estado:true
		}

		this.entrenamientoService.crearEntrenamiento(data).subscribe(res =>{
			Swal.fire({
				title:'Nueva Prueba',
				text:'¡Se ha registrado una nueva satisfactoriamente!',
				icon:'success'
			})

			this.router.navigateByUrl('/dashboard/entrenamientos')
		})
	}


	/*******************************************************************************************
	*			Realizamos Validacion
	*******************************************************************************************/
	get viewObservacionPm(){
		return this.formEntrenamient.get('f2CheckObserPm').value;
	}
	get viewf2CheckObserSm(){
		return this.formEntrenamient.get('f2CheckObserSm').value;
	}

	get valf2ValEmocionManifesPm(){
		return  this.formEntrenamient.get('f2ValEmocionManifesPm').value;
	}
	get valf2ValRelatoPm(){
		return  this.formEntrenamient.get('f2ValRelatoPm').value;
	}

	get valf2ValEmocionIndicadaSm(){
		return  this.formEntrenamient.get('f2ValEmocionIndicadaSm').value;
	}
	get valf2ValImitacionSm(){
		return  this.formEntrenamient.get('f2ValImitacionSm').value;
	}

	get gettotalPromeFase1(){
		return `${this.totalPromeFase1}%`
	}

	get gettotalPromeFase2(){
		return `${this.totalPromeFase2}%`
	}

	get gettotalPromeFase3(){
		return `${this.totalPromeFase3}%`
	}
	
	
	get gettotalEntrenamiento(){
		return `${this.totalEntrenamiento}%`
	}

	validInputInstruccionVerbal(){
		//input de instruccion Verbal
		const max = 6;
		let conta=0;
		this.alertError1 = false;
		let suma=0;
		let auxConta=0;
		const campos =[	'diversion','emocion', 'orgullologros','satisfaccion','tristeza', 'alegria',
						'miedo','enojo', 'desagrado','sorpresa'];

		campos.forEach( (valor,i) =>{
			//console.log(`valor: ${valor} - pocicion:${i}`)
			let valorInput = this.formEntrenamient.get(`instruccionVerbal.${valor}`).value;
			if(valorInput){
				//validamos que el numero que ingreso sea Valido
				if(Number(valorInput)>=0 && Number(valorInput)<=10){
					
					if(Number(valorInput)!= 0 ){//promediamos solo los que son diferentes a cero
						conta += 1;//contamos el nuemro de datos que el usuario ha ingresado
						suma += Number(valorInput);
					}

					auxConta += 1;
				}else{

					//mostramos el mensaje de Error
					this.alertError1 = true;
					//bloqueamos los demas inputs hasta que el usuario cambie el valor
					campos.forEach( (valor,i) =>{
						let valorDos = this.formEntrenamient.get(`instruccionVerbal.${valor}`).value;
						if(valorDos==null){
							this.formEntrenamient.get(`instruccionVerbal.${valor}`).disable();	
						}
					})

				}
			}	
		})

		this.promedioInsVerbal = (suma/conta);
		if( max===auxConta ){
			this.primeraFaseFull = this.primeraFaseFull + 1 ; 
		}

	}

	validInputExpresionFacial(){
		//input de instruccion Verbal
		const max = 6;
		let conta=0;
		this.alertError2 = false;
		let suma = 0;
		let auxConta=0;
		const campos =[	'diversion','emocion', 'orgullologros','satisfaccion','tristeza', 'alegria',
						'miedo','enojo', 'desagrado','sorpresa'];

		campos.forEach( (valor,i) =>{
			//console.log(`valor: ${valor} - pocicion:${i}`)
			let valorInput = this.formEntrenamient.get(`expresionFacial.${valor}`).value;
			if(valorInput){
				//validamos que el numero que ingreso sea Valido
				if(Number(valorInput)>=0 && Number(valorInput)<=10){

					//contamos el nuemro de datos que el usuario ha ingresado
					if(Number(valorInput)!= 0){
						conta += 1;
						suma += Number(valorInput);
					}

					auxConta += 1;

				}else{

					//mostramos el mensaje de Error
					this.alertError2 = true;
					//bloqueamos los demas inputs hasta que el usuario cambie el valor
					campos.forEach( (valor,i) =>{
						let valorDos = this.formEntrenamient.get(`expresionFacial.${valor}`).value;
						if(valorDos==null){
							this.formEntrenamient.get(`expresionFacial.${valor}`).disable();	
						}
					})

				}
			}	
		})

		this.promedioExpFacial = (suma/conta);
		if(max === auxConta){
			this.primeraFaseFull = this.primeraFaseFull + 1 ; 
		}

	}


	validInputSelectEmocion(){
		//input de instruccion Verbal
		const max = 6;
		let conta=0;
		this.alertError3 = false;
		let suma = 0;
		let auxConta:number = 0;
		const campos =[	'diversion','emocion', 'orgullologros','satisfaccion','tristeza', 'alegria',
						'miedo','enojo', 'desagrado','sorpresa'];
		const Emociones =['Diversión','Emoción', 'Orgullo por los logros','Satisfacción','Tristeza', 'Alegría',
						'Miedo','Enojo', 'Desagrado','Sorpresa'];

		campos.forEach( (valor,i) =>{
			
			let valorInput = this.formEntrenamient.get(`selectEmocion.${valor}`).value;
			if(valorInput){
				//validamos que el numero que ingreso sea Valido
				if(Number(valorInput)>=0 && Number(valorInput)<=100){
					//contamos el nuemro de datos que el usuario ha ingresado
					if(Number(valorInput)!=0){
						conta += 1;
						suma += Number(valorInput);
					}

					auxConta += 1;

				}else{

					//mostramos el mensaje de Error
					this.alertError3 = true;

				}
			}	
		})

		this.promedioSelecEmocion = (suma/conta);

		if(auxConta===max){
			this.segundaFaseFull = 1;
			campos.forEach( (valor,i) =>{
				
				let valorInput = Number(this.formEntrenamient.get(`selectEmocion.${valor}`).value);
				let textValCualitativo='';
				//bloqueamos todos los demas campos que estan en null
				if(!valorInput){
					this.formEntrenamient.get(`selectEmocion.${valor}`).disable();
				}else{

					if(valorInput>=80){
						textValCualitativo='Muy de Acuerdo';
					}else if(valorInput>=60 && valorInput<80){
						textValCualitativo='Algo de Acuerdo';
					}else if(valorInput>=40 && valorInput<60){
						textValCualitativo='Ni de Acuerdo Ni Desacuerdo';
					}else if(valorInput>=21 && valorInput<40){
						textValCualitativo='Algo en Desacuerdo';
					}else{
						textValCualitativo='Muy en Desacuerdo ';
					}

					this.resulSelectEmocion.unshift({	nombreEmocion: Emociones[i],
														valorEmocion: valorInput,
														valorCualitativo: textValCualitativo});
				}

			})

		}
	}
	
	validInputEmociones(){
		this.alertError4 = false;
		let val1 = Number(this.valf2ValEmocionManifesPm);
		let val2 = Number(this.valf2ValRelatoPm);

		if(val1<0 || val1 >100){
			this.alertError4 = true;	
		}else if(val2<0 || val2>100){
			this.alertError4 = true;
		}else if( val1 != null && val2 != null && val1 != 0 && val2 != 0  ){
			this.pasoNextF2Full = 1;
		}

	}

	validInputReconocimientos(){
		this.alertError6 = false;
		let val1 = Number(this.valf2ValEmocionIndicadaSm);
		let val2 = Number(this.valf2ValImitacionSm);

		if(val1<0 || val1 >100){
			this.alertError6 = true;	
		}else if(val2<0 || val2>100){
			this.alertError6 = true;
		}else if( val1 != null && val2 != null && val1 != 0 && val2 != 0  ){
			this.pasoNextF3Full = 1;
		}

	}

	validInputexpresionEmocionVcotidiana(){
		//input de instruccion Verbal
		const max = 6;
		let conta=0;
		//this.alertError = false;
		let suma = 0;
		let auxConta:number = 0;
		const campos =[	'diversion','emocion', 'orgullologros','satisfaccion','tristeza', 'alegria',
						'miedo','enojo', 'desagrado','sorpresa'];
		const Emociones =['Diversión','Emoción', 'Orgullo por los logros','Satisfacción','Tristeza', 'Alegría',
						'Miedo','Enojo', 'Desagrado','Sorpresa'];
		

		campos.forEach( (valor,i) =>{
			//console.log(`valor: ${valor} - pocicion:${i}`)
			let valorInput = this.formEntrenamient.get(`expresionEmocionVcotidiana.${valor}`).value;
			if(valorInput){
				//validamos que el numero que ingreso sea Valido
				if(Number(valorInput)>=0 && Number(valorInput)<=100){
					//contamos el nuemro de datos que el usuario ha ingresado
					if(Number(valorInput)!=0){
						conta += 1;
						suma += Number(valorInput);
					}

					auxConta += 1;

				}else{
					//mostramos el mensaje de Error
					this.alertError5 = true;

				}
			}	
		})

		this.promedioEmociones = (suma/conta);

		if(auxConta===max){
			this.terceraFaseFull = 1;
			campos.forEach( (valor,i) =>{
				
				let valorInput = Number(this.formEntrenamient.get(`expresionEmocionVcotidiana.${valor}`).value);
				let textValCualitativo='';
				//bloqueamos todos los demas campos que estan en null
				if(!valorInput){
					this.formEntrenamient.get(`expresionEmocionVcotidiana.${valor}`).disable();
				}else{

					if(valorInput>=80){
						textValCualitativo='El paciente identifica claramente la emoción';
					}else if(valorInput>20 && valorInput<80){
						textValCualitativo='El paciente no se demuestra seguro con su selección';
					}else if(valorInput>0 && valorInput<=200){
						textValCualitativo='El paciente no acierta con la identificación de la emoción ';
					}

					this.resulSelectEmocion.unshift({	nombreEmocion: Emociones[i],
														valorEmocion: valorInput,
														valorCualitativo: textValCualitativo});
				}

			})

			this.calculosFinales();

		}
	}


	
}
