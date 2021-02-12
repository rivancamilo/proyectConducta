import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2'

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styles: [
	]
})
export class LoginComponent implements OnInit {

	loginUser: FormGroup;

	constructor(
		private router: Router,
		private fb:FormBuilder,
		private userService: UsuariosService
	) {
		this.crearFormulario();
	}

	ngOnInit(): void {
	}

	crearFormulario() {
		this.loginUser = this.fb.group({
			userEmail:[ localStorage.getItem('email') || 'martin@email.com', [ Validators.required ]],
			userPassword:['123', [ Validators.required ]],
			userSaveDatos:[  false ]
		})
	}

	iniciarSesion(){

		this.userService.login(this.loginUser.value).subscribe(res => {

			if(this.loginUser.get('userSaveDatos').value){
				localStorage.setItem('email',this.loginUser.get('userEmail').value)
			}else{
				localStorage.removeItem('email')
			}
			
			this.router.navigateByUrl('/');


		},err  =>{

			console.log(err.error.msg)
			Swal.fire(
				'Error',
				err.error.msg,
				'error'
			)

		})

	}

	recoverPass() {
		this.router.navigateByUrl('recoverpass');
	}

	/**************************************************************************************
	  agregamos get's para las validaciones de los input
	**************************************************************************************/
	get userEmailNoValid() {
		return this.loginUser.get('userEmail').invalid && this.loginUser.get('userEmail').touched;
	}
	get userEmailValid() {
		return this.loginUser.get('userEmail').valid && this.loginUser.get('userEmail').touched;
	}

	get userPasswordNoValid() {
		return this.loginUser.get('userPassword').invalid && this.loginUser.get('userPassword').touched;
	}
	get userPasswordValid() {
		return this.loginUser.get('userPassword').valid && this.loginUser.get('userPassword').touched;
	}


}
