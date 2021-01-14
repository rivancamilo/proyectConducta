import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

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
			userEmail:[ localStorage.getItem('email') || 'fernanda@email.com', [ Validators.required ]],
			userPassword:['123456', [ Validators.required ]],
			userSaveDatos:[  false ]
		})
	}

	iniciarSesion(){

		console.log(this.loginUser.value)
		this.userService.login(this.loginUser.value).subscribe(res => {

			if(this.loginUser.get('userSaveDatos').value){
				localStorage.setItem('email',this.loginUser.get('userEmail').value)
			}else{
				localStorage.removeItem('email')
			}
			
			this.router.navigateByUrl('/');

		},err  =>{

			console.log(err)
		})

	}

	recoverPass() {
		this.router.navigateByUrl('recoverpass');
	}

}
