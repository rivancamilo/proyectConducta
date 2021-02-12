import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Paciente } from 'src/app/models/paciente.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { PacientesService } from 'src/app/services/pacientes.service';

@Component({
	selector: 'app-paciente',
	templateUrl: './paciente.component.html',
	styles: [
	]
})
export class PacienteComponent implements OnInit {

	nuevoPaciente: FormGroup;
	public imageSubir: File;
	public imageTemp:any = '';
	
	

	constructor(
		private fb: FormBuilder,
		private pacienteService:PacientesService,
		private fileUploadService:FileUploadService
	) {

		this.crearFormulario();
	}

	ngOnInit(): void {
		
	}

	crearFormulario() {

		this.nuevoPaciente = this.fb.group({
			pacienteNombres: ['', [Validators.required]],
			pacienteApellidos: ['', [Validators.required]],
			pacienteTipoID: ['', [Validators.required]],
			pacienteNumID: ['', [Validators.required]],
			pacienteDateNaci: ['', [Validators.required]],
			pacienteEPS: ['', [Validators.required]],
			pacienteCiudad: ['', [Validators.required]],
			pacienteDireccion: ['', [Validators.required]],
			//pacienteEdad: ['', [Validators.required]],
			//pacienteFoto: [''],
		})

	}

	/****************************************************************** 
		detectamos si el input a tenido algun cambio 
	******************************************************************/
	cambiarImagen( file: File  ){
		
		this.imageSubir = file;
		if(!file) {
			return this.imageTemp=null;
		}
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			this.imageTemp = reader.result;
			//console.log(reader.result);
		}
	}

	/***************************************************************** 
		ejecutamos el servicio que actualiza la imagen del usuario 
	*****************************************************************/
	subirImagen( idPaciente ){
		this.fileUploadService.cargarFoto(this.imageSubir,'pacientes', idPaciente )
	}

	crearPaciente() {
		const pacienteEdad = this.calculoEdad(this.nuevoPaciente.get('pacienteDateNaci').value);
		const datosPaciente = { 
			pacienteEdad,
			...this.nuevoPaciente.value
		};

		//const edad = this.calculoEdad(this.nuevoPaciente.get('pacienteDateNaci').value);
		this.pacienteService.crearPaciente( datosPaciente ).subscribe(res => {
			if(this.imageSubir){
				this.subirImagen( res._id )
			}
			
			console.log(res)
		},err =>{
			console.log(err)
		})
	}


	

	calculoEdad( fechaUsuario ) {

		//El siguiente fragmento de codigo lo uso para igualar la fecha de nacimiento con la fecha de hoy del usuario
		var d = new Date(),
			month = '' + (d.getMonth() + 1),
			day = '' + d.getDate(),
			year = d.getFullYear();

		if (month.length < 2)
			month = '0' + month;
		if (day.length < 2) {
			day = '0' + day;
		}

		var dateSistema = [year, month, day].join('-')
		/*------------*/
		var hoy = new Date(dateSistema);//fecha del sistema con el mismo formato que "fechaUsuario"
		var cumpleanos = new Date(fechaUsuario);

		//Calculamos años
		var edad = hoy.getFullYear() - cumpleanos.getFullYear();
		var m = hoy.getMonth() - cumpleanos.getMonth();
		if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
			edad--;
		}
		// calculamos los meses
		var meses = 0;
		if (hoy.getMonth() > cumpleanos.getMonth()) {
			meses = hoy.getMonth() - cumpleanos.getMonth();
		} else if (hoy.getMonth() < cumpleanos.getMonth()) {
			meses = 12 - (cumpleanos.getMonth() - hoy.getMonth());
		} else if (hoy.getMonth() == cumpleanos.getMonth() && hoy.getDate() > cumpleanos.getDate()) {

			if (hoy.getMonth() - cumpleanos.getMonth() == 0) {
				meses = 0;
			} else {
				meses = 11;
			}

		}

		// Obtener días: día actual - día de cumpleaños
		let dias = hoy.getDate() - cumpleanos.getDate();
		if (dias < 0) {
			// Si días es negativo, día actual es mayor al de cumpleaños,
			// hay que restar 1 mes, si resulta menor que cero, poner en 11
			meses = (meses - 1 < 0) ? 11 : meses - 1;
			// Y obtener días faltantes
			dias = 30 + dias;
		}

		return `${edad} años, ${meses} meses, ${dias} días`;
		//console.log(`Tu edad es de ${edad} años, ${meses} meses, ${dias} días`);

	}






	/**************************************************************************************
	  agregamos get's para las validaciones de los input
	**************************************************************************************/
	get pacienteNombresNoValid() {
		return this.nuevoPaciente.get('pacienteNombres').invalid && this.nuevoPaciente.get('pacienteNombres').touched;
	}
	get pacienteNombresValid() {
		return this.nuevoPaciente.get('pacienteNombres').valid && this.nuevoPaciente.get('pacienteNombres').touched;
	}

	get pacienteCiudadNoValid() {
		return this.nuevoPaciente.get('pacienteCiudad').invalid && this.nuevoPaciente.get('pacienteCiudad').touched;
	}
	get pacienteCiudadValid() {
		return this.nuevoPaciente.get('pacienteCiudad').valid && this.nuevoPaciente.get('pacienteCiudad').touched;
	}


	get pacienteApellidosNoValid() {
		return this.nuevoPaciente.get('pacienteApellidos').invalid && this.nuevoPaciente.get('pacienteApellidos').touched;
	}
	get pacienteApellidosValid() {
		return this.nuevoPaciente.get('pacienteApellidos').valid && this.nuevoPaciente.get('pacienteApellidos').touched;
	}

	get pacienteDateNaciNoValid() {
		return this.nuevoPaciente.get('pacienteDateNaci').invalid && this.nuevoPaciente.get('pacienteDateNaci').touched;
	}
	get pacienteDateNaciValid() {
		return this.nuevoPaciente.get('pacienteDateNaci').valid && this.nuevoPaciente.get('pacienteDateNaci').touched;
	}

	get pacienteDireccionNoValid() {
		return this.nuevoPaciente.get('pacienteDireccion').invalid && this.nuevoPaciente.get('pacienteDireccion').touched;
	}
	get pacienteDireccionValid() {
		return this.nuevoPaciente.get('pacienteDireccion').valid && this.nuevoPaciente.get('pacienteDireccion').touched;
	}

	get pacienteEPSNoValid() {
		return this.nuevoPaciente.get('pacienteEPS').invalid && this.nuevoPaciente.get('pacienteEPS').touched;
	}
	get pacienteEPSValid() {
		return this.nuevoPaciente.get('pacienteEPS').valid && this.nuevoPaciente.get('pacienteEPS').touched;
	}

}
