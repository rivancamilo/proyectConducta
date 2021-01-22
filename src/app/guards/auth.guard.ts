import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { UsuariosService } from '../services/usuarios.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {

	constructor(
		private userService: UsuariosService,
		private router: Router
	) {

	}
	/****************************************************************************
		Validamos que el usuario este autenticado
	****************************************************************************/
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot) {


		return this.userService.validarToken().pipe(
			tap(estaAutenticado => {
				if( !estaAutenticado){
					this.router.navigateByUrl('/login');
				}
			})
		)
	}

}
