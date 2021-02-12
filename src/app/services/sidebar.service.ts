import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class SidebarService {

	menu: any[] = [
		{
			tituloMenu: 'Dashboard',
			tipoMenu: 'simple',
			url:'/',
			iconoMenu: ''
		},
		{
			tituloMenu: 'Pacientes',
			tipoMenu: 'multiple',
			url:'',
			icpnoMenu: '',
			subMenu:[
				{ titulo:'Nuevo Paciente', url:'paciente' },
				{ titulo:'Lista de Pacientes', url:'pacientes' }
			]
		}
	]


	constructor() { }
}
